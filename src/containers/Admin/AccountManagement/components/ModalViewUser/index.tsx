
import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle, CloseButton } from '@/components/organisms/Modals/Modals';
import styled from 'styled-components';

const ModalContent = styled(ModalBody)`
    padding: 20px;
`;

const ModalHeaderStyled = styled(ModalHeader)`
    color: black ;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const ModalTitleStyled = styled(ModalTitle)`
    font-size: 1.5rem; 
    font-weight: bold; 
`;

const CloseButtonStyled = styled(CloseButton)`
    color: #B5B5B5; 
    &:hover {
        color:  black; 
    }
`;

const StatusText = styled.span<{ isActive: boolean }>`
    font-weight: bold;
    color: ${({ isActive }) => (isActive ? 'green' : 'red')};
`;


const UserDetailModal: React.FC<{ show: boolean; user: any; onClose: () => void }> = ({ show, user, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <ModalHeaderStyled>
                <ModalTitleStyled>User Details</ModalTitleStyled>
                <CloseButtonStyled onClick={onClose}>×</CloseButtonStyled>
            </ModalHeaderStyled>
            <ModalContent>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Create Date:</strong> {new Date(user.createdAt).toLocaleDateString('en-GB')}</p>
                <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}</p>
                <p>
                    <strong>Status:</strong>
                    <StatusText isActive={user.isActive}>{user.isActive ? " Active " : " Inactive "}</StatusText>
                </p>
            </ModalContent>
        </Modal>
    );
};

export default UserDetailModal;
