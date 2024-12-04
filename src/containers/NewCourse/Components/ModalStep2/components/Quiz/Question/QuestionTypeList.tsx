import React, { useState } from "react";
import styled from "styled-components";
import {
  FaTrashAlt,
  FaEdit,
  FaRegEdit,
  FaRegFileAlt,
  FaRegDotCircle,
  FaRegCheckCircle,
  FaList
} from "react-icons/fa";

interface Props {
  questions: MODEL.Question[];
  onDelete: (id: number) => void;
  onUpdate: (updatedQuestion: MODEL.Question) => void;
}

const QuestionContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
`;

const HandleButton = styled.div`
display: flex;
  justify-content: start;
  align-items: center;
  & > button {
    cursor: pointer;
    color: #91699c;
    font-size: 16px;
    border: none;
    margin-right: 10px;
    background: none;
    &:hover {
      color: #333;
    }
  }
`;

const QuestionTypeList: React.FC<Props> = ({ questions, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<MODEL.Question | null>(null);
  const [showType, setShowType] = useState<string | null>(null);

  const handleShowList = (type: string) => {
    setShowType(showType === type ? null : type); // Toggle visibility by type
  };

  const handleEdit = (question: MODEL.Question) => {
    setEditingId(question.id);
    setEditData(question);
  };

  return (
    <div>
      {/* <h5>Saved Questions</h5> */}
      {questions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        questions.map((question, index) => (
          <div key={index}>
            <div className="row mt-3">
              <div className="col-3 d-flex justify-content-between align-items-center">
                {/* Icon based on question type */}
                {question.type === "Single Choice" && <FaRegDotCircle />}
                {question.type === "Multiple Choice" && <FaRegCheckCircle />}
                {question.type === "Single Line Text" && <FaRegEdit />}
                {question.type === "Multi Line Text" && <FaRegFileAlt />}

                {question.type} {/* Question type label */}
              </div>

              <HandleButton className="col-9">
                <button type="button" onClick={() => handleEdit(question)}><FaEdit /></button>
                <button type="button" ><FaTrashAlt /></button>
                <button type="button" onClick={() => handleShowList(question.type)}><FaList /></button>
              </HandleButton>
            </div>

            {/* Show question title if the showType matches the question type */}
            {showType === question.type && (
              <QuestionContainer>
                <div>{question.question}</div>
              </QuestionContainer>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionTypeList;
