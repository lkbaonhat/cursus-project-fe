import { style } from "@/theme";
import React, { useState } from "react";
import styled from "styled-components";

interface Input {
  name?: string;
  value?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  margin?: string;
  padding?: string;
  className?: string;
  Icon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Container = styled.div<Input>`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

export const Label = styled.label`
  margin: ${style.size.margin.m_0};
  padding: ${style.size.padding.p_0};
`;

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: ${style.size.margin.m_4};
`;

export const InputField = styled.input<Input & { isFocused: boolean }>`
  padding: 9.5px 28px 9.5px ${(props) => (props.Icon ? "53px" : "14px")};
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "400px"};
  font-size: ${style.fonts.size.medium};
  border-radius: ${style.size.borderRadius.small};
  margin: ${style.size.margin.m_0};
  flex: 1 0 auto;
  outline: 0;
  text-align: left;
  line-height: ${style.fonts.lineHeights.small};
  border: 1px solid #e5e5e5;
  font-size: ${style.fonts.size.medium};
  font-weight: ${style.fonts.weight.medium};
  font-family: ${style.fonts.family.tertiary};
  background: ${style.colors.white.bg};
  color: ${(props) =>
    props.isFocused
      ? `${style.colors.black.title}`
      : `${style.colors.gray.text_description}`};

  &::placeholder {
    color: ${(props) =>
      props.isFocused
        ? `${style.colors.black.secondary}`
        : `${style.colors.gray.placeholder_focus}`};
  }

  &:focus {
    border-color: ${style.colors.gray.border_focus};
  }
`;

export const Icon = styled.div`
  position: absolute;
  padding-left: ${style.size.padding.p_5};
  top: 50%;
  transform: translateY(-50%);
  font-size: ${style.fonts.size.xlarge};
  color: ${style.colors.black.secondary};
`;

export default function Input(props: Input) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container padding={props.padding} margin={props.margin}>
      <Label>
        <InputContainer>
          {props.Icon && <Icon>{props.Icon}</Icon>}
          <InputField
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            width={props.width}
            height={props.height}
            Icon={props.Icon}
            isFocused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={props.onChange}
          />
        </InputContainer>
      </Label>
    </Container>
  );
}
