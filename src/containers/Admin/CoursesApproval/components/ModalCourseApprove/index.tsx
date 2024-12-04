import {
  CloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/organisms/Modals/Modals';
import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
interface CourseApprovalModalProps {
  show: boolean;
  onHide: () => void;
  course: {
    title: string;
    description: string;
    levels: string[];
    price: number;
    author: { fullname: string; email: string }[];
    subCategory: { name: string }[];
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
    background-color: #2196f3;
    color: white;

    &:hover {
      background-color: #1976d2;
    }
  }
`;

const ModalCourseApprove: React.FC<CourseApprovalModalProps> = ({
  show,
  onHide,
  course,
  onApprove,
  onReject,
}) => {
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
      {/* Modal xem thông tin khóa học */}
      <Modal show={show && !isRejecting} onHide={onHide} backdropClick>
        <ModalHeader>
          <ModalTitle>Course Approval</ModalTitle>
          <CloseButton onClick={onHide}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <h4>Title: {course.title}</h4>
          <p>
            <strong>Description: </strong> {parse(course.description)}
          </p>
          <p>
            <strong>Levels: </strong> {course.levels.join(', ')}
          </p>
          <p>
            <strong>Price: </strong> {course.price.toLocaleString('vi-VN')}
          </p>
          <p>
            <strong>Author: </strong>{' '}
            {course.author.length > 0 ? course.author[0].fullname : 'N/A'}
            {course.author.length > 0 && course.author[0].email
              ? ` (${course.author[0].email})`
              : ''}
          </p>
          <p>
            <strong>Category: </strong>{' '}
            {course.subCategory.length > 0 ? course.subCategory[0].name : 'N/A'}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button className='approve-button' onClick={handleApprove}>
            Confirm Approve
          </Button>
          <Button className='reject-button' onClick={handleReject}>
            Reject
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal cho lý do từ chối */}
      <Modal show={isRejecting} onHide={() => setIsRejecting(false)}>
        <ModalHeader>
          <ModalTitle>Rejection Reason</ModalTitle>
          <CloseButton onClick={() => setIsRejecting(false)}>
            &times;
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <RejectionInput
            placeholder='Provide details for rejection...'
            value={rejectionDetails}
            onChange={(e) => setRejectionDetails(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className='submit-reject-button'
            onClick={() => {
              onReject(rejectionDetails);
              setRejectionDetails('');
              setIsRejecting(false);
            }}
          >
            Submit Rejection
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalCourseApprove;
