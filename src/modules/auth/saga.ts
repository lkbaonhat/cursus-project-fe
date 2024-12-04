import { takeLatest, put, call } from 'redux-saga/effects';
import { setUsername } from '@/modules/auth/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserService } from '@/services/user.service';
import { CookiesService } from '@/services/cookies.service';
import { toast } from 'react-toastify';
import { ADMIN, ROLE, ROUTES } from '@/routes';
import { jwtDecode } from 'jwt-decode';
import { JWTPayload } from '@/types/IJWT';
import { cursusAPI } from '@/services';


export function* saveContentSaga(action: PayloadAction<string>) {
  try {
    // Simulate a side effect like an API call
    console.log('Saving content to API:', action.payload);
    // Perform an API call or other side effects here, if necessary.
  } catch (error) {
    console.error('Error saving content:', error);
  }
}

/**
 * Login saga
 * @param action  { username, password }
 */
function* login(action: any): Generator<any, void, any> {
  const { username, password } = action.payload;

  try {
    const response = yield call(UserService.postLogin, { username, password });
    const decodeToken = jwtDecode<JWTPayload>(response.data.access_token)
    const role = decodeToken?.role || '';
    yield put(setUsername(username));

    if (response.statusCode === 201) {
      CookiesService.set(response.data.access_token);
      toast.success('Login successfully');
      if (role === 'admin') {
        window.location.href = `/${ROLE.ADMIN}/${ADMIN.DASHBOARD}`
      }
      else {
        window.location.href = `/`
      }
    } else if (response.statusCode === 400) {
      toast.error(response.message)
      action.navigate(`${ROUTES.VERIFY_OTP}`, { state: { from: 'login' } });
    } else if (response.statusCode === 401) {
      toast.error(response.message)
    }

  } catch (error) {
    toast.error('Login failed.');
    console.log('Error during login:', error);
  }
}
//---------------End------------------//


/**
 * reset password saga
 * @param action { email }
 */
function* resetPassword(action: any): Generator<any, void, any> {
  const { email } = action.payload;

  try {
    const response = yield call(UserService.postSendOTP, { email });
    yield put(setUsername(email));

    if (response.statusCode === 201) {
      toast.success(response.data.message);
      action.navigate(`${ROUTES.VERIFY_OTP}`, { state: { from: 'reset-password' } });
    } else {
      toast.error(response.message)
    }

  } catch (error) {
    toast.error('An error occurred while resetting password.');
    console.log('Error during forgot password:', error);
  }
}
//---------------End------------------//


/**
 * register saga
 * @param action { fullname, email, password }
 */
function* register(action: any): Generator<any, void, any> {
  const { fullname, email, password } = action.payload;

  try {
    const response = yield call(UserService.postRegister, { fullname, email, password });
    yield put(setUsername(email));

    if (response.statusCode === 201) {
      toast.success('Register successfully');
      action.navigate(`${ROUTES.VERIFY_OTP}`, { state: { from: 'register' } });
    } else {
      toast.error(response.message)
    }

  } catch (error) {
    toast.error('Register failed.');
    console.log('Error during register:', error);
  }
}
//---------------End------------------//


/**
 * becomeInstructor saga
 */
function* becomeInstructor(action: any): Generator<any, void, any> {
  const { userId, status, categoryId, description } = action.payload;

  try {
    const response = yield call(cursusAPI.userService.postBecomeInstructor, userId, { status, categoryId, description });
    if (response.data.statusCode === 201) {
      toast.success(response.data.message);
      action.navigate('/')
    } else {
      toast.error(response.message)
    }

  } catch (error) {
    toast.error('Become instructor failed.');
    console.log('Error during become instructor:', error);
  }
}

export function* watchEditorSaga() {
  yield takeLatest(`${ROUTES.LOGIN}`, login);
  yield takeLatest(`${ROUTES.RESET_PASSWORD}`, resetPassword);
  yield takeLatest(`${ROUTES.REGISTER}`, register);
  yield takeLatest(`becomeInstructor`, becomeInstructor);
}
