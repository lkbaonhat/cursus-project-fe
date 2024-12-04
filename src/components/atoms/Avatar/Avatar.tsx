import styled from "styled-components";

export const Avatar = styled.img<MODEL.IStyleProps>`
  border-radius: 100%;
  display: inline-block !important;
  border: 1px solid #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "40px"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border-radius: ${(props) => props.borderRadius || "50%"};
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;
