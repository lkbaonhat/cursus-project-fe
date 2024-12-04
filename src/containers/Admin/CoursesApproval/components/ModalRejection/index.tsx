import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from '@/components/organisms/Modals/Modals';
import React from 'react';
import styled from 'styled-components';

const RejectionInput = styled.textarea`
    width: 100%;
    min-height: 80px;
    margin-top: 10px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    resize: vertical;
`;

interface RejectionModalProps {
    show: boolean;
    onHide: () => void;
    rejectionReason: string;
    setRejectionReason: (reason: string) => void;
    onSubmit: () => void;
}

const ModalRejection: React.FC<RejectionModalProps> = ({ show, onHide, rejectionReason, setRejectionReason, onSubmit }) => {
    const handleSubmit = () => {
        if (rejectionReason.trim() === '') {
            alert("Please provide a rejection reason.");
            return;
        }
        onSubmit();
    };
    return (
        <Modal show={show} onHide={onHide}>
            <ModalHeader>
                <ModalTitle>Rejection Reason</ModalTitle>
                <CloseButton onClick={onHide}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
                <RejectionInput
                    placeholder="Enter rejection reason..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalRejection;
