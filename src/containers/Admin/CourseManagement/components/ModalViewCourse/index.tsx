// UserDetailModal.tsx
import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle, CloseButton } from '@/components/organisms/Modals/Modals';
import styled from 'styled-components';
import parse from 'html-react-parser';
const ModalContent = styled(ModalBody)`
  
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

const StatusText = styled.span<{ status: string }>`
    font-weight: bold;
    color: ${({ status }) => (status ? 'green' : 'red')};
`;


const ModalViewCourse: React.FC<{ show: boolean; course: any; onClose: () => void }> = ({ show, course, onClose }) => {
    return (
        <Modal size='large' show={show} onHide={onClose}>
            <ModalHeaderStyled>
                <ModalTitleStyled>Course Details</ModalTitleStyled>
                <CloseButtonStyled onClick={onClose}>×</CloseButtonStyled>
            </ModalHeaderStyled>
            <ModalContent>
                <h4>Title: {course.title}</h4>
                <p><strong>Description: </strong> {parse(course.description)}</p>
                <p><strong>Levels: </strong> {course.levels.join(', ')}</p>
                <p><strong>Price: </strong> {course.price.toLocaleString('vi-VN')}</p>
                <p>
                    <strong>Author: </strong> {course.author.length > 0 ? course.author[0].fullname : 'N/A'}
                    {course.author.length > 0 && course.author[0].email ? ` (${course.author[0].email})` : ''}
                </p>
                <p><strong>Category: </strong> {course.subCategory.length > 0 ? course.subCategory[0].name : 'N/A'}</p>
                <p>
                    <strong>Status:</strong>
                    <StatusText status={course.status}>{course.status ? " Approved " : " Rejected "}</StatusText>
                </p>
                {course.status === 'rejected' && (
                    <p><strong>Rejection Reason </strong> {course.rejectionReason ? course.rejectionReason : 'None'}</p>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalViewCourse;
