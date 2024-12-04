import styled from 'styled-components';
import { FaList } from 'react-icons/fa';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #efefef;
  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #333;
  gap: 20px;
  @media screen and (max-width: 768px) {
    font-size: 14px; 
    gap: 10px;
  }
`;

const NewSectionButton = styled.div`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3f3f3f;
  }
  @media screen and (max-width: 768px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

interface CurriculumHeaderProps {
  onNewSectionClick: () => void;
}

const CurriculumHeader: React.FC<CurriculumHeaderProps> = ({ onNewSectionClick }) => (
  <HeaderContainer>
    <Title><FaList /> Curriculum</Title>
    <NewSectionButton onClick={onNewSectionClick}>New Section</NewSectionButton>
  </HeaderContainer>
);

export default CurriculumHeader;
