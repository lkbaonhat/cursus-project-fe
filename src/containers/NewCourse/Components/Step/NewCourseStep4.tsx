import { useState } from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { FaCartArrowDown, FaTag } from "react-icons/fa";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";

const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
`;

const PriceSection = styled.div`
  background-color: #fff;
  border: 1px solid #efefef;
  padding: 20px;
  border-radius: 5px;
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TabButton = styled.div<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#ed2a26" : "#f8f9fa")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-right: 5px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: center;

  & > h6 {
    font-size: 14px;
    font-weight: 400;
    padding: 0 150px;
    text-align: center;
  }
  & > input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  & > span {
    font-weight: 500;
    background-color: #eee;
    padding: 10px;
    border-radius: 5px;
  }
`;

const InputGroupPaid = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: center;
  border: 1px solid #ddd;
  padding: 5px 10px;

  & > input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    outline: none;
    border: none;
  }

  & > span {
    font-weight: 500;
    background-color: #eee;
    padding: 10px;
    border-radius: 5px;
  }
`;

const ContentP = styled.div`
  font-weight: 500;
  & > p {
    margin: 0;
  }
`;

interface StepForm4Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
}

const NewCourseStep4 = (props: StepForm4Props) => {
  const [activeTab, setActiveTab] = useState("free");

  return (
    <FormContainer className="row">
      <PriceSection>
        <SectionTitle>
          <i className="fas fa-dollar-sign"></i> Price
        </SectionTitle>

        <ButtonGroup className="row">
          <TabButton
            active={activeTab === "free"}
            onClick={() => setActiveTab("free")}
            className="col-lg-6"
          >
            <FaTag /> Free
          </TabButton>
          <TabButton
            active={activeTab === "paid"}
            onClick={() => setActiveTab("paid")}
            className="col-lg-6"
          >
            <FaCartArrowDown /> Paid
          </TabButton>
        </ButtonGroup>

        {activeTab === "free" && (
          <>
            <Controller
              control={props.control}
              name="requireLogIn"
              defaultValue={false}
              render={({ field }) => (
                <InputGroup>
                  <ToggleSwitch
                    active={field.value}
                    label="Require Log In"
                    onClick={() => field.onChange(!field.value)}
                  />
                </InputGroup>
              )}
            />
            <Controller
              control={props.control}
              name="requireEnroll"
              defaultValue={false}
              render={({ field }) => (
                <InputGroup>
                  <ToggleSwitch
                    active={field.value}
                    label="Require Enroll"
                    onClick={() => field.onChange(!field.value)}
                  />
                </InputGroup>
              )}
            />
            <InputGroup>
              <h6>
                If the course is free, students can enroll in the course or, if
                not required, can sign in to access it.
              </h6>
            </InputGroup>
          </>
        )}

        {activeTab === "paid" && (
          <div className="row">
            <ContentP>
              <p>Regular Price*</p>
            </ContentP>

            <Controller
              control={props.control}
              name="price"
              render={({ field }) => (
                <InputGroupPaid className="col-lg-4 col-sm-12">
                  <input
                    {...field}
                    type="number"
                    placeholder="0 VND"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <span>VND</span>
                </InputGroupPaid>
              )}
            />

            <ContentP>
              <p>Discount Price*</p>
            </ContentP>

            <Controller
              control={props.control}
              name="discount"
              render={({ field }) => (
                <InputGroupPaid className="col-lg-4 col-sm-12">
                  <input
                    {...field}
                    type="number"
                    placeholder="10%"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <span>%</span>
                </InputGroupPaid>
              )}
            />
          </div>
        )}
      </PriceSection>
    </FormContainer>
  );
};

export default NewCourseStep4;
