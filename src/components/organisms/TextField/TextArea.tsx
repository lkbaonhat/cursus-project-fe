import { style } from "@/theme";
import { useState } from "react";
import styled from "styled-components";

interface Input {
  input?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  name?: string;
  margin?: string;
  padding?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.div`
  width: 100%;
`;

const Input = styled.textarea<{ isFocused: boolean } & Input>`
  background: ${style.colors.white.bg};
  transition: color 0.1s ease, border-color 0.1s ease;
  font-size: 1em;
  line-height: ${style.fonts.lineHeights.small};
  resize: vertical;
  padding: ${style.size.padding.p_3} ${style.size.padding.p_14};
  width: 100%;
  height: ${(props) => props.height || "138px"};
  width: ${(props) => props.width || "479px"};
  border: 1px solid #e5e5e5;
  color: ${(props) =>
    props.isFocused ? `${style.colors.black.title}` : "#999"};
  outline: 0;

  &::placeholder {
    color: ${(props) =>
      props.isFocused
        ? `${style.colors.black.secondary}`
        : `${style.colors.gray.placeholder_focus}`};
  }

  &:focus {
    border-color: ${style.colors.gray.border_focus} !important;
  }
`;

export default function TextArea(props: Input) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <InputContainer>
      <Input
        placeholder={
          props.placeholder || "Write a little description about you..."
        }
        value={props.input}
        width={props.width}
        height={props.height}
        name={props.name}
        margin={props.margin}
        padding={props.padding}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={props.onChange}
      />
    </InputContainer>
  );
}
