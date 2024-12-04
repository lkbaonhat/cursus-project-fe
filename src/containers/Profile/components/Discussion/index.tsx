import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/components/atoms/Button/Button";
import { style } from "@/theme";
import React from "react";
import styled from "styled-components";

export const FormComment = styled.form`
  background-color: ${style.colors.white.bg};
  border-radius: 3px;
  margin-bottom: 30px;
  padding: 20px;
  clear: right;
  div {
    display: flex;
  }
`;

export const TextAreaStyled = styled.textarea`
  margin-left: 20px;
  border: 1px solid ${style.colors.gray.textarea_border};
  width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: horizontal;
  height: 40px;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #333;
  padding: 12px;
  border-radius: 3px;
  background: ${style.colors.gray.textarea_bg};
`;

export default function Discussion() {
  return (
    <div>
      <h3>Discussion</h3>
      <FormComment>
        <div>
          <Avatar src={`${style.images.avatar.profile}`} />
          <TextAreaStyled
            name="comment"
            placeholder="Add a public comment"
          ></TextAreaStyled>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            type="submit"
            border_radius="3px"
            margin="10px 0 0 0"
            padding="0 20px"
            width="auto"
          >
            Comment
          </Button>
        </div>
      </FormComment>
    </div>
  );
}
