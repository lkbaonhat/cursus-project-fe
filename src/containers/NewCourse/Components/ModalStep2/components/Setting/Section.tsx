import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Description = styled.p`
  margin-top: 5px;
  color: #666;
`;

interface SectionProps {
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => {
  return (
    <SectionContainer>
      <Label>{title}</Label>
      {children}
      <Description>{description}</Description>
    </SectionContainer>
  );
};

export default Section;
