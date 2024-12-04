import { style } from "@/theme";
import styled from "styled-components";
import { useEffect, useRef } from "react";

// Styled Components
const DropdownContainer = styled.div<COMPONENTS.DropdownProps>`
  display: block;
  position: relative;
`;

export const DropdownToggle = styled.div<COMPONENTS.DropdownProps & MODEL.IStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.width || "auto"};
  padding: ${(props) => props.padding || '0px'};
  font-size: ${(props) => props.fontSize || style.fonts.size.large};
  font-weight: ${(props) => props.fontWeight || style.fonts.weight.medium};
  color: ${(props) => props.color || style.colors.gray.text};
  border: 1px solid ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius || style.size.borderRadius.small};
  cursor: pointer;
`;

export const DropdownMenu = styled.div<{ isOpen: boolean } & MODEL.IStyleProps>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: ${(props) => props.borderRadius || style.size.borderRadius.small};
  width: ${(props) => props.width || "auto"};
  z-index: 9999;
`;

export const DropdownItem = styled.div<MODEL.IStyleProps>`
  padding: ${(props) => props.padding || style.size.padding.p_2};
  font-size: ${(props) => props.fontSize || style.fonts.size.medium};
  color: ${(props) => props.color || style.colors.gray.text};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.backgroundColor || style.colors.pink.background_logo};
  }
`;

export const Dropdown = ({ children, isOpen, setIsOpen, ...props }: COMPONENTS.DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen && setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContainer ref={dropdownRef}>
      {children}
    </DropdownContainer>
  )
};
