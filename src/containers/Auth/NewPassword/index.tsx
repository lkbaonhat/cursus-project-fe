import { useForm } from 'react-hook-form';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlinePassword } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { UserService } from '@/services/user.service';
import { useSelector } from 'react-redux';

import { useVerifyUserInRedux } from '@/utils/hooks/useUser';
import { toast } from 'react-toastify';
import { ButtonAuth } from '../components';
import { ROUTES } from '@/routes';
import { selectAuthState, selectAuthStateUsername } from '@/modules/auth/selector';

const NewPassword = () => {
    const username = useSelector(selectAuthStateUsername);
    const navigate = useNavigate();

    /**
     * Redirect to login page if username is not found in redux
     */
    useVerifyUserInRedux();
    //---------------------------Redirect to login page if user is not logged in---------------------------//


    /**
     * Form submit reset password
     */
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data: any) => {
        const { confirmPassword, ...newData } = data;

        UserService.postNewPassword(newData)
            .then((response) => {
                if (response.statusCode === 201) {
                    toast.success(response.data.message);
                    navigate(`${ROUTES.LOGIN}`);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
                toast.error(error.message);
            });
    };

    const pattern = {
        password: {
            value: /^[a-zA-Z0-9-]{6,}\b$/,
            message: 'Password must contain at least 6 characters',
        },
    };
    //---------------------------Form submit reset password---------------------------//


    /**
     * Handle confirm password
     * @param value 
     * @returns 
     */
    const handleConfirmPassword = (value: string) => {
        if (value !== watch('password')) {
            return 'Password does not match';
        }
        return true;
    };
    //---------------------------Handle confirm password---------------------------//

    return (
        <div className='newpassword-page'>
            <form className='form-newpassword container'>
                <div className="title">
                    <p>New Password</p>
                </div>

                <div className="form-newpassword__input">
                    <input type="hidden" {...register('email')} value={username || ''} />

                    <div className='group'>
                        <div className={`group-input input__password ${errors.password ? 'input-error' : ''}`}>
                            <RiLockPasswordFill className='icon' />
                            <input
                                type='password'
                                {...register('password', { required: true, pattern: pattern.password })}
                                placeholder='Password'
                            />
                        </div>

                        <div className="group-action">
                            <div>
                                {errors.password && <span className='error'>{pattern.password.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className='group'>
                        <div className={`group-input input__password ${errors.confirmPassword ? 'input-error' : ''}`}>
                            <MdOutlinePassword className='icon' />
                            <input
                                type='password'
                                {...register('confirmPassword', {
                                    required: true,
                                    validate: handleConfirmPassword,
                                })}
                                placeholder='Confirm password'
                            />
                        </div>
                        <div className="group-action">
                            <div>
                                {errors.confirmPassword && <span className='error'>{String(errors.confirmPassword.message)}</span>}
                                {errors.confirmPassword?.type === 'required' && <span className='error'>Confirm password is required</span>}
                            </div>
                        </div>
                    </div>

                    <div className="action-button">
                        <ButtonAuth onClick={handleSubmit(onSubmit)}>Send</ButtonAuth>
                    </div>
                </div>

                <div className="login">
                    <span>Go Back</span>
                    <Link to={ROUTES.LOGIN}>Sign In</Link>
                </div>
            </form >
        </div >
    );
};

export default NewPassword;
