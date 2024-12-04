import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from "react-icons/fa";

// Styled components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: teal;
  border-radius: 4px;
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1;
  max-height: 180px;
  overflow-y: scroll;
  border-radius: 3px;
`;

const DropdownItem = styled.li<{ selected: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.selected ? '#f5f5f5' : 'white')};
  color: ${(props) => (props.selected ? 'red' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
  .selected{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
  }
`;

const ArrowIcon = styled.div`
  border: solid teal;
  border-width: 0 2px 2px 0;
  padding: 4px;
  transform: rotate(45deg);
  margin-left: 10px;
`;

// TypeScript interface for the component props
interface SelectDropdownProps {
  options: string[];
  placeholder?: string;
  value: string[];
  onChange?: (selected: string[]) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, placeholder, value = [], onChange, }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {

    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange?.(updatedOptions); // Call onChange with updated options


  };

  return (
    <DropdownContainer
      tabIndex={0} // Make the div focusable
      onBlur={() => setIsOpen(false)} // Close on losing focus
    >
      <DropdownHeader onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : placeholder}
        <ArrowIcon />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option}
              selected={selectedOptions.includes(option)}
              onClick={() => handleSelect(option)}
            >
              {selectedOptions.includes(option) &&
                (<div className='selected'>
                  {option} < FaCheck />
                </div>)
              }

              {!selectedOptions.includes(option) &&
                (<div>{option}</div>)
              }
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};


export default SelectDropdown;
