import CkEditor from "@/components/CkEditor/CkEditor";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const BasicContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > h6 {
    font-size: 14px;
    font-weight: 500;
  }
  & > input {
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    padding: 10px 20px;
    margin-bottom: 3%;
  }
`;

interface BasicTabProps {
  control: any;
  tilte: string;
}

const BasicTab = (props: BasicTabProps) => {
  return (
    <BasicContainer>
      <h6>{props.tilte}</h6>
      <Controller
        name="title"
        control={props.control}
        render={({ field }) => (
          <input {...field} type="text" placeholder="Title here" />
        )}
      />

      <h6>Description*</h6>
      <Controller
        name="description"
        control={props.control}
        render={({ field }) => (
          <CkEditor {...field} value={field.value} onChange={field.onChange} />
        )}
      />
    </BasicContainer>
  );
};

export default BasicTab;
