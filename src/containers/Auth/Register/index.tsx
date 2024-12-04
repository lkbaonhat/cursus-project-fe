import { useForm } from 'react-hook-form';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ButtonAuth } from '../components';
import { useDispatch } from 'react-redux';
import { ROUTES } from '@/routes';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    /**
      * Toggle hide and show password
      */
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('password')
    const togglePassword = () => {
        setShowPassword(!showPassword)
        setPassword(password === 'password' ? 'text' : 'password')
    }
    //---------------------------Toggle hide and show password---------------------------//


    /**
     * Form submit register
     */
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: object) => {
        dispatch({ type: `${ROUTES.REGISTER}`, payload: data, navigate, state: { form: 'register' } });
    }

    const pattern = {
        fullname: {
            value: /[^\s]/,
            message: 'Invalid fullname'
        },
        email: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email'
        },
        password: {
            value: /^[a-zA-Z0-9-]{6,}\b$/,
            message: 'Password must contain at least 6 characters'
        }
    }
    //---------------------------Form submit login---------------------------//

    return (
        <div className='register-page'>
            <form className='form-register container'>
                <div className="title">
                    <p>Welcome to Cursus</p>
                    <p>Sign Up and Start Learning!</p>
                </div>

                <div className="form-register__input">
                    <div className='group'>
                        <div className={`group-input input__fullname ${errors.fullname ? 'input-error' : ''}`}>
                            <input {...register('fullname', { required: true, pattern: pattern.fullname.value })} placeholder='Full Name' />
                        </div>

                        {errors.fullname && <span className='error'>{pattern.fullname.message}</span>}
                    </div>

                    <div className='group'>
                        <div className={`group-input input__email ${errors.email ? 'input-error' : ''}`}>
                            <input {...register('email', { required: true, pattern: pattern.email.value })} placeholder='Email Address' />
                        </div>

                        {errors.email && <span className='error'>{pattern.email.message}</span>}
                    </div >

                    <div className='group'>
                        <div className={`group-input input__password ${errors.password ? 'input-error' : ''}`}>
                            <input type={password} {...register('password', { required: true, pattern: pattern.password.value })} placeholder='Password' />
                            <div className="eye" onClick={togglePassword}>
                                {showPassword
                                    ? <FaEye className='eye' />
                                    : <FaEyeSlash className='eye' />}
                            </div>
                        </div>
                        {errors.password && <span className='error'>{pattern.password.message}</span>}
                    </div >
                </div >

                <div className="action-button">
                    <ButtonAuth onClick={handleSubmit(onSubmit)}>Next</ButtonAuth>
                </div>

                <div className="rule">
                    <span>By signing up, you agree to our <span className='highlight'>Terms of Use</span> and <span className='highlight'>Privacy Policy.</span></span>
                </div>

                <div className="register">
                    <span>Already have an account?</span>
                    <Link to={ROUTES.LOGIN}>Sign In</Link>
                </div>
            </form >
        </div >
    )
}

export default Register