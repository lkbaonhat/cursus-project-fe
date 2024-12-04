import styled from 'styled-components';
import { ReactNode } from 'react';

// Sidebar container
const SidebarContainer = styled.div<{ isOpen?: boolean; width: string; backgroundColor: string }>`
  width: ${({ isOpen, width }) => (isOpen ? width : '0px')};
  min-height: 100vh;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  /* left: 0; */
  transition: width 0.3s;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  z-index: 9;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 65px;
  &:hover {
    overflow-y: auto;
  }
`;

interface SideContainerProps {
  isOpen?: boolean;
  width: string;
  backgroundColor: string;
  children: ReactNode;
}

export const SideContainer = ({ isOpen, width, backgroundColor, children }: SideContainerProps) => {
  return (
    <SidebarContainer isOpen={isOpen} width={width} backgroundColor={backgroundColor}>
      {children}
    </SidebarContainer>
  );
};
