import styled from "styled-components";

export const IconButton = styled.a<MODEL.IStyleProps>`
  display: inline-block;
  margin-right: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  text-align: center;
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  svg {
    vertical-align: baseline;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
