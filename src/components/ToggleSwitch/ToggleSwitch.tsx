import React from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitchWrapper = styled.div<{ active: boolean }>`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${({ active }) => (active ? "#ff4d4f" : "#ccc")};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({ active }) => (active ? "26px" : "2px")};
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

interface ToggleSwitchProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ active, label, onClick }) => {
  return (
    <ToggleContainer>
      <ToggleSwitchWrapper active={active} onClick={onClick} />
      <span style={{ marginLeft: "10px", fontWeight: "bold" }}>{label}</span>
    </ToggleContainer>
  );
};

export default ToggleSwitch;
