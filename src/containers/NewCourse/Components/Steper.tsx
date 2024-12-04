
import styled from "styled-components";

interface SteperProps {
    steps: string[];
    currentStep: number;
}

const All = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 50px 0;
    @media screen and (max-width: 768px) {
        margin: 20px 0;
    }
`;

const NumberScription = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #333333;
`;

const Number = styled.div<{ active: boolean }>`
    border-radius: 50%;
    transition: ease-in-out;
    border: 8px solid ${({ active }) => (active ? `#ffc5c5` : '#d9d9d9')};
    background-color: ${({ active }) => (active ? 'red' : '#b4b4b4')};
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition-duration: 500ms;
    margin: 10px auto;
    z-index: 2;
    @media screen and (max-width: 768px) {
        border: 8px solid ${({ active }) => (active ? `#ffc5c5` : '#d9d9d9')};
        padding: 5px;
        margin: 6px auto;
    }
`;

const Numberhover = styled.div<{ active: boolean }>`
    border-radius: 50%;
    transition: ease-in-out;
    background-color: ${({ active }) => (active ? 'rgba(255, 0, 0, 0.3)' : '#edecec')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition-duration: 500ms;
    margin: 10px auto;
    z-index: 1;
    position: absolute;
    top: -7px;
    @media screen and (max-width: 768px) {
        margin: 0%;
    }
`;

const Description = styled.div<{ active: boolean }>`
    margin-top: 8px;
    font-size: 14px;
    color: ${({ active }) => (active ? 'black' : '#333')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    transition: color 0.5s ease-in-out;
    @media screen and (max-width: 768px) {
        font-size: 8px;
        margin-top: 0;
    }
`;

const Line = styled.div<{ active: boolean }>`
    height: 8px;
    background-color: ${({ active }) => (active ? 'red' : '#edecec')};
    transition: all 0.3s ease-in-out;
    transition-duration: 500ms;
    display: flex;
    flex: 0;
    left: 50%;
    width: 100%;
    position: absolute;
    z-index: 0;
    bottom: 55px;
    @media screen and (max-width: 768px) {
        height: 6px;
        bottom: 56%;
    }
`;

const Steper: React.FC<SteperProps> = ({ steps, currentStep }) => {
    return (
        <All>
            {steps.map((step, index) => (
                <div
                    key={index}
                    style={{
                        width: '20%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <NumberScription>
                        <Number active={index + 1 <= currentStep}></Number>
                        <Numberhover active={index + 1 <= currentStep}></Numberhover>
                        <Description active={index + 1 <= currentStep}>{step}</Description>
                    </NumberScription>
                    {index < steps.length - 1 && (
                        <Line active={index + 1 < currentStep}></Line>
                    )}
                </div>
            ))}
        </All>
    );
};

export default Steper;