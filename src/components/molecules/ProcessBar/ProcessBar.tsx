import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
    value: number; // Giá trị hiện tại của progress bar (phần trăm)
}

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const Progress = styled.div<{ width: number }>`
  height: 20px;
  background-color: #ed2a26;
  border-radius: 5px;
  width: ${(props) => props.width}%; /* Đặt độ rộng theo giá trị truyền vào */
  transition: width 0.5s ease;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    return (
        <ProgressBarContainer>
            <Progress width={value} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} />
        </ProgressBarContainer>
    );
};

export default ProgressBar;
