import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, CloseButton } from '@/components/organisms/Modals/Modals';
import styled from 'styled-components';

// Styled components for the modal
const StyledModal = styled(Modal)`
    max-width: 400px; 
    width: 100%; 
    border-radius: 12px; 
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); 
    border: none; 
    background-color: rgba(255, 255, 255, 0.95);
`;

const ModalContent = styled(ModalBody)`
    text-align: center;
`;

const ModalTitleStyled = styled(ModalTitle)`
    font-size: 1.25rem; 
    color: #333; 
    margin-bottom: 15px; 
`;

const ConfirmButton = styled.button`
    background-color: #FF5C5C; 
    color: white;
    border: none; 
    border-radius: 50px; 
    padding: 10px 25px; 
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background-color: #D10000; 
        transform: translateY(-2px); 
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
`;

const CancelButton = styled.button`
    background-color: transparent; 
    color: #555; 
    border: none; 
    border-radius: 50px; 
    padding: 10px 25px; 
    cursor: pointer;
    font-weight: bold;
    margin-right: 10px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(200, 200, 200, 0.3);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;

interface DeleteConfirmationModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ show, onConfirm, onCancel }) => {
    return (
        <StyledModal show={show} onHide={onCancel}>
            <ModalHeader>
                <ModalTitleStyled>Confirm Deletion</ModalTitleStyled>
                <CloseButton onClick={onCancel}>×</CloseButton>
            </ModalHeader>
            <ModalContent>
                <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            </ModalContent>
            <ModalFooter>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
            </ModalFooter>
        </StyledModal>
    );
};

export default DeleteConfirmationModal;
