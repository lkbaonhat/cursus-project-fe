import { useForm } from 'react-hook-form';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MdMailOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ButtonAuth } from '../components';
import { ROUTES } from '@/routes';

const ResetPassword = () => {
    const navigate = useNavigate()
    const dispath = useDispatch();

    /**
     * Form submit reset password
     */
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        dispath({ type: `${ROUTES.RESET_PASSWORD}`, payload: data, navigate, state: { from: 'reset-password' } });
    };

    const pattern = {
        email: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email'
        },
    };
    //---------------------------Form submit reset password---------------------------//

    return (
        <div className='resetpassword-page'>
            <form className='form-resetpassword container'>
                <div className="title">
                    <p>Reset Password</p>
                </div>

                <div className="form-resetpassword__input">
                    <div className='group'>
                        <div className={`group-input input__email ${errors.email ? 'input-error' : ''}`}>
                            <MdMailOutline className='icon' />
                            <input {...register('email', { required: true, pattern: pattern.email })} placeholder='Email' />
                        </div>

                        <div className="group-action">
                            <div>
                                {errors.email && <span className='error'>{pattern.email.message}</span>}
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
            </form>
        </div >
    );
};

export default ResetPassword;
