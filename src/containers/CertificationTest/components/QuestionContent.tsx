import { style } from "@/theme";
import React from "react";
import styled from "styled-components";

interface QuestionContentProps {
    question: any;
    questionIndex: number;
    totalQuestions: number;
    userAnswer: any; // Updated to handle multiple types (string or array)
    onAnswerChange: (questionIndex: number, optionIndex: number, isCorrect: boolean, score: number) => void;
    onTextAnswerChange: (questionIndex: number, text: string) => void; // For text answers
    onNext: () => void;
    onPrevious: () => void;
    onSubmit: () => void;
}

// Styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: #ffffff; /* Nền trắng */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 400px;
    margin: 0 auto;
`;

const QuestionTitle = styled.h4`
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #000000; /* Văn bản đen */
`;

const QuestionText = styled.p`
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333333; /* Văn bản xám đậm */
`;

const OptionsContainer = styled.div`
    margin-bottom: 20px;
`;

const Option = styled.div<{ selected: boolean }>`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #cccccc; /* Viền xám */
    border-radius: 5px;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? "#ffcccc" : "#ffffff")}; /* Nền đỏ nhạt khi được chọn, trắng khi chưa chọn */
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.selected ? "#ff9999" : "#f0f0f0")}; /* Nền đỏ nhạt hơn khi hover, xám nhạt khi chưa chọn */
    }

    label {
        font-size: 1rem;
        color: #555555; /* Văn bản xám đậm */
    }
`;

const TextAnswer = styled.div`
    margin-bottom: 20px;
    
    input {
        width: 100%;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #cccccc; /* Viền xám */
        border-radius: 5px;
    }
`;

const NavigationButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        padding: 10px 20px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid ${style.colors.gray.bg_card_under};
        transition: background-color 0.3s;

        &:disabled {
            background-color: #cccccc; /* Nền xám khi bị vô hiệu hóa */
            cursor: not-allowed;
        }

        &:not(:disabled) {
            background-color: #ffffff; /* Nền trắng */
            color: #000000; /* Văn bản đen */

            &:hover {
                background-color: #000000; /* Nền đen khi hover */
                color: #ffffff; /* Văn bản trắng khi hover */
            }
        }
    }
`;

// Component
const QuestionContent: React.FC<QuestionContentProps> = ({
    question,
    questionIndex,
    totalQuestions,
    userAnswer,
    onAnswerChange,
    onTextAnswerChange,
    onNext,
    onPrevious,
    onSubmit,
}) => {
    const isSingleChoice = question?.type === "Single Choice";
    const isMultipleChoice = question?.type === "Multiple Choice";

    const handleSingleChoiceChange = (optionIndex: number) => {
        // For single-choice, just set the selected answer
        const isCorrect = question?.options[optionIndex]?.isCorrect;
        onAnswerChange(questionIndex, optionIndex, isCorrect, question.score);
    };

    const handleMultipleChoiceChange = (optionIndex: number) => {
        // For multiple-choice, manage an array of selected indexes
        const updatedAnswers = Array.isArray(userAnswer) ? [...userAnswer] : [];
        const answerIndex = updatedAnswers.indexOf(optionIndex);
        if (answerIndex > -1) {
            updatedAnswers.splice(answerIndex, 1); // Remove if already selected
        } else {
            updatedAnswers.push(optionIndex); // Add if not selected
        }
        const isCorrect = updatedAnswers.every((index) => question.options[index].isCorrect);

        onAnswerChange(questionIndex, updatedAnswers, isCorrect, question.score);
    };
    return (
        <Container>
            <div>
                <QuestionTitle>Question {questionIndex + 1}</QuestionTitle>
                <QuestionText>{question?.type === 'Multiple Choice' ? `${question?.question} (Select all correct answers)` : `${question?.question}`}</QuestionText>

                {/* Handle Single Choice */}
                {isSingleChoice && (
                    <OptionsContainer>
                        {question?.options.map((option: any, index: number) => (
                            <Option
                                key={index}
                                selected={userAnswer === index.toString()}
                                onClick={() => handleSingleChoiceChange(index)}
                            >
                                <label>{option.title}</label>
                            </Option>
                        ))}
                    </OptionsContainer>
                )}

                {/* Handle Multiple Choice */}
                {isMultipleChoice && (
                    <OptionsContainer>
                        {question?.options.map((option: any, index: number) => (
                            <Option
                                key={index}
                                selected={Array.isArray(userAnswer) && userAnswer.includes(index)}
                                onClick={() => handleMultipleChoiceChange(index)}
                            >
                                <label>{option.title}</label>
                            </Option>
                        ))}
                    </OptionsContainer>
                )}

                {/* Handle Text Answer */}
                {!isSingleChoice && !isMultipleChoice && (
                    <TextAnswer>
                        <input
                            type="text"
                            name={`question-${questionIndex}`}
                            value={userAnswer || ""}
                            onChange={(e) => onTextAnswerChange(questionIndex, e.target.value)}
                            placeholder="Enter your answer here..."
                        />
                    </TextAnswer>
                )}
            </div>

            {/* Navigation buttons */}
            <NavigationButtons>
                <button onClick={onPrevious} disabled={questionIndex === 0}>
                    Previous
                </button>
                {questionIndex < totalQuestions - 1 ? (
                    <button onClick={onNext}>Next</button>
                ) : (
                    <button onClick={onSubmit}>Submit</button>
                )}
            </NavigationButtons>
        </Container>
    );
};

export default QuestionContent;
