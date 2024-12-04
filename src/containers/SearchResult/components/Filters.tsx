import { useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  width: 100%;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FilterSection2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
`;

const FilterHeader = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1;
  margin-right: 120px;
`;

const SortDropdown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  margin-left: 110px;
`;

const FilterItem = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 12px;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #e5e5e5;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
  }

  .text-container {
    font-size: 16px;
    flex-grow: 1;
  }

  .plus-minus {
    font-size: 16px;
  }
`;

interface DropdownContentProps {
  isActive: boolean;
}

const DropdownContent = styled.div<DropdownContentProps>`
  border-radius: 4px;
  width: 100%;
  transition: max-height 0.5s ease, opacity 0.3s ease;
  overflow: hidden;
  max-height: ${({ isActive }) => (isActive ? '200px' : '0')};
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  display: flex;
  flex-direction: column;
  padding-left: 10px;

  label {
    margin: 10px 0 0 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 300px;

    input[type='checkbox'] {
      appearance: none;
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      margin-right: 8px;
      border: 2px solid #ccc;
      border-radius: 50%;
      position: relative;
      cursor: pointer;
      transition: all 0.2s ease;

      &:checked {
        background-color: #ed2a26;
        border-color: #ed2a26;
      }

      &:checked::before {
        content: '\\2714';
        color: white;
        font-size: 14px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    span {
      margin-left: 8px;
      font-size: 14px;
      color: #333;
    }
  }
`;

const filterOptions = [
  { label: 'Topic', options: ['SEO', 'Php', 'Wordpress Pro'] },
  { label: 'Level', options: ['All Levels', 'Beginner', 'Intermediate', 'Expert'] },
  { label: 'Language', options: ['English', 'Vietnamese'] },
  { label: 'Price', options: ['Free', 'Paid'] },
  { label: 'Features', options: ['Captions', 'Quizzes', 'Coding Exercises', 'Practice Tests'] },
  { label: 'Rating', options: ['5 Stars and Up', '4 Stars and Up'] },
  { label: 'Video Duration', options: ['0-2 Hours', '3-6 Hours', '7-18 Hours'] },
  { label: 'Close Caption', options: ['English', 'Vietnamese'] },
];

const Filters = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const handleDropdownToggle = (index: number): void => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <HeaderContainer>
      <FilterSection>
        <FilterSection2>
          <FilterHeader>Filters</FilterHeader>
          <SortDropdown>Sort ▼</SortDropdown>
        </FilterSection2>

        {filterOptions.map((filter, index) => (
          <FilterItem key={index} className={openDropdownIndex === index ? 'active' : ''}>
            {/* Only header triggers the toggle */}
            <div className="header" onClick={() => handleDropdownToggle(index)}>
              <div className="text-container">{filter.label}</div>
              <span className="plus-minus">
                {openDropdownIndex === index ? '-' : '+'}
              </span>
            </div>

            {/* Checkbox content */}
            <DropdownContent isActive={openDropdownIndex === index}>
              {filter.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input type="checkbox" />
                  <span>{option}</span>
                </label>
              ))}
            </DropdownContent>
          </FilterItem>
        ))}
      </FilterSection>
    </HeaderContainer>
  );
};

export default Filters;
