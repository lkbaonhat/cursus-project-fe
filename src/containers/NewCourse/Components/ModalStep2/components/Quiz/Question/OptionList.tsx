import { style } from "@/theme";
import React, { useState } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  options: MODEL.Option[];
  onAddOption: (option: MODEL.Option) => void;
  onDeleteOption: (id: number) => void;
}

const OptionContainer = styled.div`
  margin-top: 20px;
`;

const OptionInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  outline: none;
  border: 1px solid ${style.colors.gray.bg_card_under};
`;
 const ButtonDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: end;
  align-items: center;
 `

const AddOptionButton = styled.button`
  background-color: ${style.colors.red.bg};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  width: 95%;
  
`;

const ComtainerOption = styled.div`
    /* border: 1px solid ${style.colors.gray.bg_card_under}; */
`
const DeleteButton = styled.div`
  /* background: none;
  border: none;
  color: ${style.colors.red.bg}; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  button{
    background: none;
    border: none;
    color: ${style.colors.red.bg};
  }
`;

const OptionList: React.FC<Props> = ({ options, onAddOption, onDeleteOption }) => {
  const [optionTitle, setOptionTitle] = useState("");

  const handleAddOption = () => {
    if (optionTitle.trim() === "") return;
    const newOption: MODEL.Option = {
      id: Date.now(),
      title: optionTitle,
      isCorrect: false,
    };
    onAddOption(newOption);
    setOptionTitle("");
  };

  return (
    <OptionContainer>
      <label>Options</label>
      <div className="row">
        <div className="col-9">
          <OptionInput
            type="text"
            value={optionTitle}
            onChange={(e) => setOptionTitle(e.target.value)}
            placeholder="Option title"
          />
        </div>
        
        <ButtonDiv className="col-3">
          <AddOptionButton onClick={handleAddOption}>Add Option</AddOptionButton>
        </ButtonDiv>
      </div>

      {options.map((option, index) => (
        <div key={option.id}>
          <label>{index + 1}. Option</label>
          <ComtainerOption className="row">
            <div className="col-11">
              <OptionInput
                type="text"
                value={option.title}
                onChange={(e) => onAddOption({ ...option, title: e.target.value })}
              />
            </div>
            <DeleteButton className="col-1">
              <button onClick={() => onDeleteOption(option.id)}><FaTrashAlt size={30} /></button>
            </DeleteButton>
           
          </ComtainerOption>
          
        </div>
      ))}
    </OptionContainer>
  );
};

export default OptionList;
