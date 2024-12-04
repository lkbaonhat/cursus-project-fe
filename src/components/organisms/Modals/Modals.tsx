
import { style } from '@/theme';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  onHide?: () => void;
  backdropClick?: boolean;
  hideButton?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Overlay = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.358);
  z-index: 1000;
`;


/**
 * ModalContainerProps
 */
type ModalSize = 'small' | 'medium' | 'large';
const getModalWidth = (size: ModalSize) => {
  switch (size) {
    case 'small':
      return '400px';
    case 'medium':
      return '600px';
    case 'large':
      return '800px';
    default:
      return '600px';
  }
}

type ModalContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: string;
  backgroundColor?: string;
  top?: string;
  left?: string;
  size?: ModalSize;
};


export const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  top: ${(props) => props.top || '30%'};
  left: ${(props) => props.left || '50%'};
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  width: ${(props) => getModalWidth(props.size || 'medium')};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  top: 50%;
`;
//------------------------End------------------------//


export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin-top: 10px;
  padding: 20px;
  max-height: 550px;
  overflow-y: scroll;
  border-top: 1px solid ${style.colors.black.secondary};
  border-bottom: 1px solid ${style.colors.black.secondary};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalFooter = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export const Modal = (props: ModalProps) => {
  const { show = false, onHide, backdropClick = false, children, size } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget && backdropClick && onHide) {
      onHide();
    }
  };

  return (
    <>
      <Overlay show={show} onClick={handleBackdropClick}>
        <ModalContainer size={size}>
          {children}
        </ModalContainer>
      </Overlay >
    </>
  );
};

