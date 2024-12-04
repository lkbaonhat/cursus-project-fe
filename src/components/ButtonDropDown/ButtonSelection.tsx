import { selectedCategories } from '@/modules/course/selector';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// Styled components
const SelectionContainer = styled.div`
  position: relative;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const DropdownTrigger = styled.div`
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: teal;
  border-radius: 3px;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
`;

const CategoryHeader = styled.div`
  padding: 8px 10px;
  font-size: 14px;
  color: gray;
  background-color: #f9f9f9;
`;

const DropdownItem = styled.div<{ selected: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.selected ? '#f5f5f5' : 'white')};
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  color: ${(props) => (props.selected ? 'red' : 'black')};

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ArrowIcon = styled.div`
  border: solid teal;
  border-width: 0 2px 2px 0;
  padding: 4px;
  transform: rotate(45deg);
  margin-left: 10px;
`;


interface ButtonSelectionProps {
  placeholder?: string;
  value: string;
  onChange?: (selected: string) => void;
}

const ButtonSelection: React.FC<ButtonSelectionProps> = ({ placeholder, value, onChange, }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(value);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const listcategories = useSelector(selectedCategories);

  useEffect(() => {
    dispatch({ type: 'getAllCategories' });
  }, [dispatch]);

  const handleSelect = (option: string) => {
    listcategories.map((category) => {
      category.subcategories.map((subcategory) => {
        if (subcategory._id === option) {
          setSelectedOption(subcategory.name);
        }
      })
    })

    onChange?.(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <SelectionContainer
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      <DropdownTrigger onClick={toggleDropdown}>
        {selectedOption || placeholder}
        <ArrowIcon />
      </DropdownTrigger>
      {isOpen && (
        <DropdownList>
          {listcategories.map((category, index) => (
            <div key={index}>
              <CategoryHeader>{category.name}</CategoryHeader>
              {category?.subcategories?.map((subcategory, index) => (
                <DropdownItem
                  key={index}
                  selected={selectedOption === subcategory?.name}
                  onClick={() => handleSelect(subcategory?._id)}
                >
                  {subcategory.name}
                </DropdownItem>
              ))}
            </div>
          ))}
        </DropdownList>
      )}
    </SelectionContainer>
  );
};

export default ButtonSelection;
