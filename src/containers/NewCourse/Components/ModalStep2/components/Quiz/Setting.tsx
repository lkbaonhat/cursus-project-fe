import { Controller } from "react-hook-form";
import styled from "styled-components";
import Section from "../Setting/Section";
import InputField from "../Setting/InputField";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";

const InputContainer = styled.div`
 input{
   width: 100%;
   padding: 10px;
   border: 1px solid #ccc;
   border-radius: 4px;
   margin-top: 5px;
   outline: none;
 }
`;

interface SettingProps {
  control: any;
  setValue: any
}

const Setting = (props: SettingProps) => {

  return (
    <div>
      {/* Gradable Section */}
      <Section
        title='Quiz Gradable'


        description="If this quiz test affects the student's grading system for this course."
        children={
          <Controller
            name="quizGradable"
            control={props.control}
            render={({ field }) => (
              <ToggleSwitch
                active={field.value}
                label=""
                onClick={() => field.onChange(!field.value)}
              />
            )}
          />}
      />

      {/* Remaining Time Display Section */}
      <Section
        title="Show Time"
        description="By enabling this option, quiz taker will see the remaining time during the attempt."
        children={
          <Controller
            name="showTime"
            control={props.control}
            render={({ field }) => (
              <ToggleSwitch
                active={field.value}
                label=""
                onClick={() => field.onChange(!field.value)}
              />
            )}
          />}
      />

      {/* Input Fields */}
      <InputContainer className="row">
        <div className="col-4">
          <InputField
            label="Time Limit*"
            description="Set zero to disable time limit."
          />
          <Controller
            control={props.control}
            name="timeLimit"
            defaultValue={0}
            render={({ field }) => (
              <input {...field} type="number" placeholder="Time Limit" />
            )}
          />
        </div>

        <div className="col-4">
          <InputField
            label="Passing Score (%)*"
            description="Student must achieve this score in percent to pass the quiz."
          />
          <Controller
            control={props.control}
            name="passingScore"
            defaultValue={0}
            render={({ field }) => (
              <input {...field} type="number" placeholder="Passing Score" />
            )}
          />
        </div>

        <div className="col-4">

          <InputField
            label="Questions Limit*"
            description="The number of questions the student has to answer in this quiz."
          />
          <Controller
            control={props.control}
            name="questionLimit"
            defaultValue={0}
            render={({ field }) => (
              <input {...field} type="number" placeholder="Questions Limit" />
            )}
          />

        </div>
      </InputContainer>
    </div>
  );
};

export default Setting;
