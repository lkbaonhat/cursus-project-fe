import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/components/organisms/Modals/Modals";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

interface ModalAddSubcategoryProps {
  show: boolean;
  onClose: () => void;
  categories: MODEL.CATEGORY[];
  onSubcategoryCreated: (categoryId: string, subcategories: string[]) => void;
}

const ModalAddSubcategory: React.FC<ModalAddSubcategoryProps> = ({ show, onClose, categories, onSubcategoryCreated }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryList, setSubcategoryList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const addSubcategoryToList = () => {
    if (subcategoryName.trim()) {
      setSubcategoryList([...subcategoryList, subcategoryName.trim()]);
      setSubcategoryName("");
    } else {
      toast.error("Subcategory name cannot be empty.");
    }
  };
  const removeSubcategoryFromList = (name: string) => {
    setSubcategoryList(subcategoryList.filter(sub => sub !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    if (subcategoryList.length === 0) {
      toast.error("Please add at least one subcategory.");
      return;
    }
    
    onSubcategoryCreated(selectedCategory, subcategoryList);
    setSubcategoryList([]);
    onClose();
  };
  return (
    <StyledModal show={show} onHide={onClose} backdropClick={true} size="medium">
      <StyledModalHeader>
        <StyledModalTitle>Add Subcategories</StyledModalTitle>
        <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
      </StyledModalHeader>
      <form onSubmit={handleSubmit}>
        <StyledModalBody>
          <StyledLabel>Select Category:</StyledLabel>
          <StyledSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </StyledSelect>

          <StyledLabel>Subcategory Name:</StyledLabel>
          <StyledInputContainer>
            <StyledInput
              type="text"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
            />
            <AddButton type="button" onClick={addSubcategoryToList}>Add</AddButton>
          </StyledInputContainer>

          <SubcategoryList>
            {subcategoryList.map((sub, index) => (
              <SubcategoryItem key={index}>
                {sub}
                <RemoveButton type="button" onClick={() => removeSubcategoryFromList(sub)}>Remove</RemoveButton>
              </SubcategoryItem>
            ))}
          </SubcategoryList>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton type="submit">Add Subcategories</StyledButton>
        </StyledModalFooter>
      </form>
    </StyledModal>
  )
}

export default ModalAddSubcategory
const StyledModal = styled(Modal)`
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  padding: 20px;
`;

const StyledModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
`;

const StyledModalTitle = styled(ModalTitle)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
`;

const StyledCloseButton = styled(CloseButton)`
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  border: none;
  background: none;
  &:hover {
    color: #111827;
  }
`;

const StyledModalBody = styled(ModalBody)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  color: #374151;
  font-weight: 500;
  margin-bottom: 10px;
  display: block;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  color: #374151;
  outline: none;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  color: #374151;
  outline: none;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  &:hover {
    background-color: #4f46e5;
  }
`;

const SubcategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubcategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #e5e7eb;
  color: #374151;
  font-size: 1rem;
  margin-bottom: 8px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.2s;
  &:hover {
    color: #b91c1c;
  }
`;

const StyledModalFooter = styled(ModalFooter)`
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  &:hover {
    background-color: #059669;
  }
`;
