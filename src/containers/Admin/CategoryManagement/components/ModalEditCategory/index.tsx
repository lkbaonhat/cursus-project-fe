import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/components/organisms/Modals/Modals";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";


interface ModalEditCategoryProps {
    category: MODEL.CATEGORY;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedCategory: MODEL.CATEGORY) => void;
}
const ModalEditCategory: React.FC<ModalEditCategoryProps> = ({ category, isOpen, onClose, onSave }) => {
    const dispatch = useDispatch();
    const [newCategoryName, setNewCategoryName] = useState(category.name ?? "");
    const [subcategories, setSubcategories] = useState<MODEL.SUBCATEGORY[]>(category.subcategories);
    const [removedSubcategories, setRemovedSubcategories] = useState<string[]>([]);
    useEffect(() => {
        setNewCategoryName(category.name ?? "");
        setSubcategories(category.subcategories);
      }, [category]);


      const handleSaveChanges = () => {
        if (!newCategoryName.trim()) {
          toast.error("Category name cannot be empty");
          return;
        }
    
        dispatch({
          type: "editCategory",
          payload: {
            categoryId: category._id,
            name: newCategoryName,
            subcategories,
            removedSubcategories,
          },
        });
    
        onSave({
          ...category,
          name: newCategoryName,
          subcategories,
        });
    
        setRemovedSubcategories([]);
        onClose();
      };






    const removeSubcategory = (id: string) => {
        setSubcategories((prevSubcategories) =>
            prevSubcategories.filter((sub) => sub._id !== id)
        );
        setRemovedSubcategories((prev) => [...prev, id]);
    };

    return (
        <StyledModal show={isOpen} onHide={onClose} backdropClick={true} size="medium">
            <StyledModalHeader>
                <StyledModalTitle>Edit Category</StyledModalTitle>
                <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
            </StyledModalHeader>

            <StyledModalBody>
                <Label>Category Name:</Label>
                <StyledInput
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />

                <Subtitle>Subcategories</Subtitle>
                <SubcategoryList>
                    {subcategories.map((sub) => (
                        <SubcategoryTag key={sub._id}>
                            {sub.name}
                            <RemoveButton onClick={() => removeSubcategory(sub._id)}>Remove</RemoveButton>
                        </SubcategoryTag>
                    ))}
                </SubcategoryList>


            </StyledModalBody>

            <StyledModalFooter>
                <SaveButton onClick={handleSaveChanges}>Save</SaveButton>
                <CancelButton onClick={onClose}>Cancel</CancelButton>
            </StyledModalFooter>
        </StyledModal>
    )
}

export default ModalEditCategory
const StyledModal = styled(Modal)`
    border-radius: 8px;
    padding: 20px;
`;

const StyledModalHeader = styled(ModalHeader)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
`;

const StyledModalTitle = styled(ModalTitle)`
    font-size: 24px;
    font-weight: bold;
`;

const StyledCloseButton = styled(CloseButton)`
    font-size: 24px;
    color: #888;
    cursor: pointer;
    background: none;
    border: none;
    &:hover {
        color: #444;
    }
`;

const StyledModalBody = styled(ModalBody)`
    padding: 20px 0;
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 6px;
    display: block;
`;

const Subtitle = styled.h4`
    font-size: 18px;
    font-weight: 600;
    margin-top: 15px;
    color: #333;
`;

const SubcategoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
`;

const SubcategoryTag = styled.div`
    background-color: #f1f1f1;
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: red;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        color: darkred;
    }
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }
`;

const StyledModalFooter = styled(ModalFooter)`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 10px;
`;

const SaveButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
`;

const CancelButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    color: #333;
    background-color: #e0e0e0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #c0c0c0;
    }
`;
