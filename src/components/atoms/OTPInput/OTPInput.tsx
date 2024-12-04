import styled from "styled-components";
import { style } from '@/theme'
import { useState } from "react";
import { Controller } from "react-hook-form";

const ContainerOTP = styled.div<MODEL.IStyleProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: ${(props) => props.margin || style.size.margin.m_3};
`;

const Input = styled.input<MODEL.IStyleProps>`
    width: ${(props) => props.width || '70px'};
    height: ${(props) => props.height || '70px'};
    outline: none;
    font-size: ${(props) => props.fontSize || style.fonts.size.large};
    text-align: center;
    border: 1px solid ${style.colors.black.title};
    border-radius: ${props => props.borderRadius || '10px'};
    padding: ${props => props.padding || '10px'};

    &:focus {
        border: 2px solid ${style.colors.black.title};
        border-color: ${style.colors.black.title};
    }
`;

export const OTPInput = ({ length, onChange, name, control, rules, clearErrors }: COMPONENTS.IOTPInputProps) => {
    const [otp, setOTP] = useState<string[]>(new Array(length).fill(''));

    /**
     * Handle change input
     * @param e 
     * @param index 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOTP(newOtp);
            onChange(newOtp.join(""));

            if (value) {
                clearErrors(name);
            }

            if (value && index < length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };
    //---------------------------Handle change input---------------------------//


    /**
     * Handle paste
     * @param e 
     */
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("text");
        if (/^\d+$/.test(pasteData)) {
            const newOtp = pasteData.slice(0, length).split("");
            setOTP(newOtp);
            onChange(newOtp.join(""));
            const nextInput = document.getElementById(
                `otp-${Math.min(newOtp.length, length) - 1}`
            );
            nextInput?.focus();
        }
    };
    //---------------------------Handle paste---------------------------//


    /**
     *  Handle key down
     * @param e 
     * @param index 
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };
    //---------------------------Handle key down---------------------------//


    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ fieldState: { error } }) => {
                return (
                    <>
                        <ContainerOTP onPaste={handlePaste}>
                            {otp.map((value, index) => (
                                <Input
                                    key={index}
                                    type="text"
                                    id={`otp-${index}`}
                                    value={value}
                                    maxLength={1}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={`group-input input__code ${error ? 'input-error' : ''}`}
                                />
                            ))}
                        </ContainerOTP>
                    </>
                );
            }}
        >
        </Controller>
    );
}

