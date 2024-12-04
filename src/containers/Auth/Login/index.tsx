import './index.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { MdMailOutline } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ButtonAuth } from '@/containers/Auth/components/index';
import { ROUTES } from '@/routes';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation('login');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Toggle hide and show password
   */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('password');
  const togglePassword = () => {
    setShowPassword(!showPassword);
    setPassword(password === 'password' ? 'text' : 'password');
  };
  //---------------------------Toggle hide and show password---------------------------//

  /**
   * Form submit login
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: object) => {
    dispatch({
      type: `${ROUTES.LOGIN}`,
      payload: data,
      navigate,
      state: { form: 'login' },
    });
  };

  const pattern = {
    username: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: t('login.invalid_email'),
    },
    password: {
      value: /^[a-zA-Z0-9-]{6,}\b$/,
      message: t('login.invalid_password'),
    },
  };
  //---------------------------Form submit login---------------------------//

  return (
    <div className='login-page'>
      <form className='form-login container'>
        <div className='title'>
          <p>{t('login.welcome_back')}</p>
          <p>{t('login.login_to_account')}</p>
        </div>

        <div className='form-login__input'>
          <div className='group'>
            <div
              className={`group-input input__email ${
                errors.username ? 'input-error' : ''
              }`}
            >
              <MdMailOutline className='icon' />
              <input
                {...register('username', {
                  required: true,
                  pattern: pattern.username.value,
                })}
                placeholder={t('login.email')}
              />
            </div>

            {errors.username && (
              <span className='error'>{pattern.username.message}</span>
            )}
          </div>

          <div className='group'>
            <div
              className={`group-input input__password ${
                errors.password ? 'input-error' : ''
              }`}
            >
              <FaKey className='icon' />
              <input
                type={password}
                {...register('password', {
                  required: true,
                  pattern: pattern.password.value,
                })}
                placeholder={t('login.password')}
              />

              <div className='eye' onClick={togglePassword}>
                {showPassword ? (
                  <FaEye className='eye' />
                ) : (
                  <FaEyeSlash className='eye' />
                )}
              </div>
            </div>

            {errors.password && (
              <span className='error'>{pattern.password.message}</span>
            )}
          </div>

          <div className='forgot-password'>
            <Link to={ROUTES.RESET_PASSWORD}>{t('login.forgot_password')}</Link>
          </div>
        </div>

        <div className='action-button'>
          <ButtonAuth onClick={handleSubmit(onSubmit)}>
            {t('login.send')}
          </ButtonAuth>
        </div>

        <div className='register'>
          <span>{t('login.dont_have_account')}</span>
          <Link to={ROUTES.REGISTER}>{t('login.sign_up')}</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
