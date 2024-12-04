import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/components/organisms/Modals/Modals";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";


interface ModalAddCategoryProps {
  show: boolean;
  onClose: () => void;
  onCategoryCreated: (categoryName: string) => void;
}

const ModalAddCategory: React.FC<ModalAddCategoryProps> = ({ show, onClose, onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
        toast.error("Category name cannot be empty.");
        return;
    }
    onCategoryCreated(categoryName.trim());
    setCategoryName("");
};

  return (
    <StyledModal show={show} onHide={onClose} backdropClick={true} size="medium">
      <StyledModalHeader>
        <StyledModalTitle>Create New Category</StyledModalTitle>
        <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
      </StyledModalHeader>
      <form onSubmit={handleSubmit}>
        <StyledModalBody>
          <StyledLabel>Category Name:</StyledLabel>
          <StyledInput
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton type="submit">Add</StyledButton>
        </StyledModalFooter>
      </form>
    </StyledModal>
  )
}

export default ModalAddCategory
const StyledModal = styled(Modal)`
background-color: #ffffff;
border-radius: 8px;
`;

const StyledModalHeader = styled(ModalHeader)`
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;
`;

const StyledModalTitle = styled(ModalTitle)`
font-weight: bold;
`;

const StyledCloseButton = styled(CloseButton)`
color: #888;
cursor: pointer;
&:hover {
  color: #444;
}
`;

const StyledModalBody = styled(ModalBody)`
padding: 30px 20px;

`;

const StyledLabel = styled.p`
font-size: 18px;
font-weight: 500;
margin-bottom: 10px;
text-align: left;
`;

const StyledInput = styled.input`
width: 100%;
padding: 10px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 4px;
outline: none;

&:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }
`;

const StyledModalFooter = styled(ModalFooter)`
padding: 10px 20px;
display: flex;
justify-content: flex-end;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
`;

const StyledButton = styled.button`
padding: 10px 20px;
font-size: 18px;
color: #fff;
background-color: #007bff;
border: none;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
  background-color: #0056b3;
}
`;
