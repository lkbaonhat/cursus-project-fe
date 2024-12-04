import React from "react";
import CountDown from "./contdown";
import styled from "styled-components";
import { style } from "@/theme";

interface SidebarProps {
    title: string;
    questions: any[];
    userAnswer: any;
    timeLimit: number;
    currentQuestionIndex: number;
    onQuestionSelect: (index: number) => void;
    onTimeUp: () => void;
}

// Styled components
const SidebarWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const QuestionsList = styled.div`
    padding: 10px;
    background-color: #ffffff; /* Nền trắng */
    border-radius: 4px;
    border: 1px solid ${style.colors.gray.bg_card_under};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TimeLimit = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    background-color: #ffffff; /* Nền trắng */
    border-radius: 4px;
    border: 1px solid ${style.colors.gray.bg_card_under};
    font-size: large;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const QuestionButton = styled.button<{ isActive: boolean; isAnswered: boolean }>`

    min-width: 60px;
    padding: 10px;
    background-color: ${(props) =>
        props.isActive
            ? "#ff0000" // Màu đỏ cho câu đang được chọn
            : props.isAnswered
                ? "#ffcccc" // Màu đỏ nhạt cho câu đã trả lời
                : "#f0f0f0"}; // Màu xám nhạt cho câu chưa trả lời
    color: ${(props) =>
        props.isActive
            ? "#ffffff" // Màu trắng cho chữ khi đang được chọn
            : props.isAnswered
                ? "#000000" // Màu đen cho chữ khi đã trả lời
                : "#555555"}; // Màu xám đậm cho chữ khi chưa trả lời
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: ${(props) =>
        props.isActive
            ? "#cc0000" // Màu đỏ đậm khi hover câu đang được chọn
            : props.isAnswered
                ? "#ff9999" // Màu đỏ nhạt hơn khi hover câu đã trả lời
                : "#cccccc"}; // Màu xám khi hover câu chưa trả lời
    }
`;

const QuestionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
`;

const Sidebar: React.FC<SidebarProps> = ({
    title,
    questions,
    timeLimit,
    currentQuestionIndex,
    onQuestionSelect,
    onTimeUp,
    userAnswer,
}) => {
    return (
        <SidebarWrapper>
            <Title className="text-center">Quiz Title: <strong>{title}</strong></Title>
            <TimeLimit className="text-center">
                {timeLimit ?
                    <CountDown initialTime={timeLimit} onTimeUp={() => onTimeUp()} /> :
                    <p>Loading timer...</p>
                }
            </TimeLimit>

            <QuestionsList>
                <Title>
                    <h5>Question Panel</h5>
                </Title>
                <QuestionsContainer>
                    {questions.map((_, index) => (
                        <QuestionButton
                            isAnswered={userAnswer[index]}
                            key={index}
                            isActive={index === currentQuestionIndex}
                            onClick={() => onQuestionSelect(index)}
                        >
                            {index + 1}
                        </QuestionButton>
                    ))}
                </QuestionsContainer>
            </QuestionsList>
        </SidebarWrapper>
    );
};

export default Sidebar;
