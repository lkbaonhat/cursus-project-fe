import React from "react";
import styled from "styled-components";

interface ConfirmDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Màu nền mờ */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Đảm bảo lớp phủ nằm trên cùng */
`;

const DialogContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #ffffff; /* Nền trắng */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    z-index: 1001; /* Đảm bảo hộp thoại nằm trên lớp phủ */
`;

const DialogText = styled.p`
    font-size: 1.2rem;
    color: #333333; /* Văn bản xám đậm */
    margin-bottom: 20px;
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.button<{ primary?: boolean }>`
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: ${(props) => (props.primary ? "#ff0000" : "#cccccc")}; /* Đỏ cho nút chính, xám cho nút phụ */
    color: ${(props) => (props.primary ? "#ffffff" : "#000000")}; /* Trắng cho chữ nút chính, đen cho chữ nút phụ */

    &:hover {
        background-color: ${(props) => (props.primary ? "#cc0000" : "#888888")}; /* Đỏ đậm khi hover nút chính, xám đậm khi hover nút phụ */
    }
`;

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm, onCancel }) => (
    <Overlay>
        <DialogContainer>
            <DialogText>Some questions are unanswered. Do you want to submit?</DialogText>
            <ButtonContainer>
                <Button primary onClick={onConfirm}>Yes</Button>
                <Button onClick={onCancel}>No</Button>
            </ButtonContainer>
        </DialogContainer>
    </Overlay>
);

export default ConfirmDialog;
