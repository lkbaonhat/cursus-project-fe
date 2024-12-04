// src/components/ItemText.tsx
import React from 'react';
import styled from 'styled-components';

export type ItemTextProps = {
    text: string;
    icon?: React.ReactNode;
    color?: string;
    backgroundColor?: string;
    hoverColor?: string;
    hoverBackgroundColor?: string;
    width?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    margin?: string;
    textAlign?: string;
};

// Styled component cho text
export const StyledText = styled.p<{ color?: string }>`
  color: ${({ color }) => color || '#000'};
  font-size: 16px;
  margin: 0;
  transition: color 0.3s;
`;

//Styled container cho icon và text, bao gồm hiệu ứng hover

export const StyledItemText = styled.div<{
    backgroundColor?: string;
    hoverColor?: string;
    hoverBackgroundColor?: string;
    height?: string;
    textAlign?: string;
    width?: string;
}>`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  height: ${({ height }) => height || 'auto'}; 
  text-align: ${({ textAlign }) => textAlign || 'center'};
  width:${({ width }) => width || '150px'}; 

  span {
    margin-right: 8px;
    display: flex;
    align-items: center;
    color: inherit; /* Kế thừa màu của thẻ cha */
    transition: color 0.3s; 
  }

  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor || '#ffe5e5'}; 
    
    ${StyledText} {
      color: ${({ hoverColor }) => hoverColor || '#ff0000'}; 
    }

    span {
      color: ${({ hoverColor }) => hoverColor || '#ff0000'}; 
    }
  }

  &:active {
    background-color: #ffcccc; 
  }
`;


const ItemText = ({
    text,
    icon,
    color,
    backgroundColor,
    hoverColor,
    hoverBackgroundColor,
    height,
    width,
    textAlign,
}: ItemTextProps) => {
    return (
        <StyledItemText
            backgroundColor={backgroundColor}
            hoverColor={hoverColor}
            hoverBackgroundColor={hoverBackgroundColor}
            height={height}
            width={width}
            textAlign={textAlign}
        >
            {icon && <span>{icon}</span>}
            <StyledText color={color}>{text}</StyledText>
        </StyledItemText>
    );
};

export default ItemText;
