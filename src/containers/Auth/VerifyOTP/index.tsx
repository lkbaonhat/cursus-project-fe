import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './index.scss';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserService } from '@/services/user.service';
import { useVerifyUserInRedux } from '@/utils/hooks/useUser';
import { ButtonAuth } from '../components';
import { OTPInput } from '@/components/atoms/OTPInput/OTPInput';
import { ROUTES } from '@/routes';
import { useSelector } from 'react-redux';
import { selectAuthStateUsername } from '@/modules/auth/selector';

const Verify = () => {
    const username = useSelector(selectAuthStateUsername);
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Redirect to login page if username is not found in redux
     */
    useVerifyUserInRedux();
    //---------------------------Redirect to login page if user is not logged in---------------------------//

    const from = location.state?.from;



    /**
     * Timer handling for resend OTP
     */
    const [time, setTime] = useState<number>(300);
    const [isCounting, setIsCounting] = useState<boolean>(false);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    useEffect(() => {
        if (isCounting && time > 0) {
            const interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }

        if (time === 0) {
            setIsCounting(false);
        }
    }, [isCounting, time]);
    //---------------------------Timer handling for resend OTP---------------------------//


    const handleNavigate = (from: string) => {
        if (from === 'login' || from === 'register') {
            UserService.postActiveAccount({ email: username });
            navigate(`${ROUTES.LOGIN}`);
        } else if (from === 'reset-password') {
            navigate(`${ROUTES.NEW_PASSWORD}`);
        }
    }

    /**
     * Handle resend OTP
     */
    const handleResend = async () => {
        try {
            UserService.postSendOTP({ email: username })
                .then(res => {
                    if (res.statusCode === 201) {
                        toast.success('OTP resent successfully!');
                        setTime(300);
                        setIsCounting(true);
                    } else {
                        toast.error(res.message || 'Failed to resend OTP.');
                    }
                })
        } catch (error) {
            toast.error('An error occurred while resending OTP.');
            console.error(error);
        }
    };
    //---------------------------Handle resend OTP---------------------------//


    /**
    * Form submit verify OTP
    */
    const { register, handleSubmit, setValue, control, formState: { errors }, clearErrors } = useForm();

    const onSubmit = (data: any) => {
        const otpCode = Object.values(data.otp).join('');

        UserService.postVerifyOTP({ ...data, code: otpCode })
            .then(res => {
                if (res.statusCode === 201) {
                    toast.success('Verify successfully');
                    handleNavigate(from);
                } else {
                    toast.error(res.message)
                }
            })
            .catch(error => {
                toast.error('An error occurred while verifying OTP.');
                console.error(error);
            });
    };
    //---------------------------Form submit verify OTP---------------------------//

    return (
        <div className='verify-page'>
            <form className='form-verify container'>
                <div className="title">
                    <p>Verify Account</p>
                </div>

                <div className="form-verify__input">
                    <input type="hidden" {...register('email')} value={username || ''} />
                    <div className='group'>
                        <OTPInput
                            length={6}
                            name="otp"
                            control={control}
                            rules={{
                                required: "OTP is required",
                                validate: {
                                    length: (value: string) => value.length === 6 || "OTP must be 6 digits long",
                                }
                            }}
                            onChange={(otp: string) => setValue("otp", otp)}
                            clearErrors={clearErrors}
                        />

                        {/* <div className={`group-input input__code ${errors.code ? 'input-error' : ''}`}>
                            <FaInbox className='icon' />
                            <input {...register('code', { required: true, pattern: pattern.code })} placeholder='OTP' />
                        </div>*/}

                        <div className="group-action">
                            <div>
                                {errors.otp && <span className="error">{String(errors.otp.message)}</span>}
                            </div>

                            <div className="time">
                                {!isCounting && (
                                    <button type='button' className='resend' onClick={handleResend}>Resend</button>
                                )}
                                {isCounting && <span>{formatTime(time)}</span>}
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

export default Verify;
