import styled from "styled-components";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";
import MyCKEditor from "@/components/CkEditor/CkEditor";
import {Controller } from "react-hook-form";
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
  & > span {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 16px;
  }
`;

interface BasicTab {
  title: string;
  description: string;
  freePreview: boolean;
}

interface BasicTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

const BasicTab = (props: BasicTabProps) => {
  return (
    <BasicContainer>
      <h6>Lecture Title*</h6>
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
          <MyCKEditor {...field} value={field.value} onChange={field.onChange} />
        )}
      />

      <span>
        <Controller
          name="freePreview"
          control={props.control}
          render={({ field }) => (
            <ToggleSwitch active={field.value} onClick={() => field.onChange(!field.value)} label=" Free Preview" />
          )}
        />
      </span>
    </BasicContainer>
  );
};

export default BasicTab;
