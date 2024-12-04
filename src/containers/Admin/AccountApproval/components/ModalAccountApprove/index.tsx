import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from '@/components/organisms/Modals/Modals';
import React, { useState } from 'react';
import styled from 'styled-components';

interface AccountApprovalModalProps {
    show: boolean;
    onHide: () => void;
    user: {
        _id: string;
        email: string;
        fullname: string;
        createdAt: string;
        role: string;
        isActive: boolean;
    };
    onApprove: () => void;
    onReject: (rejectionDetails: string) => void;
}

const RejectionInput = styled.textarea`
   width: 100%;
    min-height: 80px;
    margin-top: 10px;
    padding: 10px; 
    border-radius: 4px;
    border: 1px solid #ccc; 
    background-color: #f9f9f9; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
    transition: border 0.3s, box-shadow 0.3s;

    &:focus {
        border: 1px solid #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
        outline: none; 
    }

    resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.approve-button {
    background-color: #4caf50; 
    color: white;

    &:hover {
      background-color: #45a049;
    }
  }

  &.reject-button {
    background-color: #f44336; 
    color: white;

    &:hover {
      background-color: #e53935;
    }
  }

  &.submit-reject-button {
    background-color: #2196F3; 
    color: white;

    &:hover {
      background-color: #1976D2;
    }
  }
`;

const ModalAccountApprove: React.FC<AccountApprovalModalProps> = ({ show, onHide, user, onApprove, onReject }) => {
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionDetails, setRejectionDetails] = useState('');

    const handleApprove = () => {
        onApprove();
        onHide();
    };

    const handleReject = () => {
        setIsRejecting(true);
    };

    return (
        <>

            <Modal show={show && !isRejecting} onHide={onHide} backdropClick>
                <ModalHeader>
                    <ModalTitle>Account Approval</ModalTitle>
                    <CloseButton onClick={onHide}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <p><strong>Name: </strong>{user.fullname}</p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Role: </strong>{user.role}</p>
                </ModalBody>
                <ModalFooter>
                    <Button className="approve-button" onClick={handleApprove}>Confirm Approve</Button>
                    <Button className="reject-button" onClick={handleReject}>Reject</Button>
                </ModalFooter>
            </Modal>

            {/* Modal cho lý do từ chối */}
            <Modal show={isRejecting} onHide={() => setIsRejecting(false)} >
                <ModalHeader>
                    <ModalTitle>Rejection Reason</ModalTitle>
                    <CloseButton onClick={() => setIsRejecting(false)}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <RejectionInput
                        placeholder="Provide details for rejection..."
                        value={rejectionDetails}
                        onChange={(e) => setRejectionDetails(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button className="submit-reject-button" onClick={() => {
                        onReject(rejectionDetails);
                        setRejectionDetails('');
                        setIsRejecting(false);
                    }}>Submit Rejection</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ModalAccountApprove;
