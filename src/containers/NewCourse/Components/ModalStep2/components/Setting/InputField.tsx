import { style } from "@/theme";
import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  flex: 1;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

const TimeUnit = styled.span`
  display: block;
  margin-top: 5px;
  text-align: start;
  font-size: 12px;
  font-weight: 500;
  color: ${style.colors.black.secondary};
`;

interface InputFieldProps {
  label: string;
  description: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, description }) => {
  return (
    <InputContainer>
      <label>{label}</label>
      <TimeUnit>{description}</TimeUnit>
    </InputContainer>
  );
};

export default InputField;
