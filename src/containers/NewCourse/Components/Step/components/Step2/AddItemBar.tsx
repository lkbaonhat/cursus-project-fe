import styled from 'styled-components';
import { FaRegPlusSquare } from 'react-icons/fa';

const AddItemBarContainer = styled.div`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: start;
  color: white;
  gap: 20px;
  @media screen and (max-width: 768px) {
    justify-content: space-around;
    padding: 4px;
  }
`;

const ButtonAddItemBar = styled.button`
  background-color: #333;
  border: none;
  color: #fff;
  display: flex;
  gap: 10px;
  align-items: center;
  @media screen and (max-width: 768px) {
    gap: 4px;
    font-size: 14px;
  }
`;

interface AddItemBarProps {
  onAddLecture: () => void;
  onAddQuiz: () => void;
  onAddAssignment: () => void;
}

const AddItemBar: React.FC<AddItemBarProps> = ({ onAddLecture, onAddQuiz, onAddAssignment }) => (
  <AddItemBarContainer>
    <ButtonAddItemBar type='button' onClick={onAddLecture}><FaRegPlusSquare /> Lecture</ButtonAddItemBar>
    <ButtonAddItemBar type='button' onClick={onAddQuiz}><FaRegPlusSquare /> Quiz</ButtonAddItemBar>
    <ButtonAddItemBar type='button' onClick={onAddAssignment}><FaRegPlusSquare /> Assignment</ButtonAddItemBar>
  </AddItemBarContainer>
);

export default AddItemBar;
