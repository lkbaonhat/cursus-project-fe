import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dialog = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:first-child {
        background-color: #ff0000;
        color: white;
    }

    &:last-child {
        background-color: #cccccc;
    }
`;

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <Overlay>
            <Dialog>
                <p>{message}</p>
                <Button onClick={onConfirm}>Yes</Button>
                <Button onClick={onCancel}>No</Button>
            </Dialog>
        </Overlay>
    );
};

export default ConfirmDialog;
