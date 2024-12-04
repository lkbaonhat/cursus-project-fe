import styled from 'styled-components';
import { FaBars, FaEdit, FaTrashAlt } from 'react-icons/fa';

const SectionContainer = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #efefef;
  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #efefef;
  @media screen and (max-width: 768px) {
    padding: 6px;
  }
`;

const SectionTitle = styled.h4`
  font-size: 16px;
  color: #333;
  margin: 0;
  display: flex;
  gap: 10px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const SectionControls = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

interface SectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  section: any;
  onEditSection: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  children: React.ReactNode; // Add this line
}


const Section = (props: SectionProps) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle><FaBars /> {props.section.name}</SectionTitle>
        <SectionControls>
          <IconButton type='button' onClick={() => props.onEditSection(props.section._id)}><FaEdit /></IconButton>
          <IconButton type='button' onClick={() => props.onDeleteSection(props.section._id)}><FaTrashAlt /></IconButton>
        </SectionControls>
      </SectionHeader>
      {props.children}
    </SectionContainer>
  )

};

export default Section;
