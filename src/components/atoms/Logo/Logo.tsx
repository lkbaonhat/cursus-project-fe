import styled from "styled-components";

type LogoProps = {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  boxShadow?: string;
  hover?: boolean;
  cursor?: string;
};

export const Logo = styled.img<LogoProps>`
  src: ${(props) => props.src || ""};
  alt: ${(props) => props.alt || ""};
  width: ${(props) => props.width || "145px"};
  height: ${(props) => props.height || "35px"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  margin: ${(props) => props.margin || "0px"};
  padding: ${(props) => props.padding || "0px"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  cursor: ${(props) => props.cursor || "default"};
  &:hover {
    transition: all 0.3s;
    /* transform: scale(1.01); */
  }

  @media (max-width: 500px) {
    width: ${(props) => props.width || "100px"};
    height: ${(props) => props.height || "50px"};
  }
`;
