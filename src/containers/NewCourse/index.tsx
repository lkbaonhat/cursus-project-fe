import { useState } from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import styled from "styled-components";
import Steper from "./Components/Steper";
import StepControl from "./Components/StepControl";
import NewCourseStep1 from "./Components/Step/NewCourseStep1";
import NewCourseStep2 from "./Components/Step/NewCourseStep2";
import NewCourseStep3 from "./Components/Step/NewCourseStep3";
import NewCourseStep4 from "./Components/Step/NewCourseStep4";
import NewCourseStep5 from "./Components/Step/NewCourseStep5";
import { SubmitHandler, useForm } from "react-hook-form";
import { decodeJWT } from "@/utils/hooks/useUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { cursusAPI } from "@/services";

interface StepForm1 {
  title: string;
  shortDescription: string;
  description: string;
  studentLearn: string;
  requirements: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  levels: any[]; // Change the type to any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language: any[]; // Change the type to any[]
  subCategoryId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captions: any[]; // Change the type to any[]
  useId: string;
}

interface StepForm3 {
  introVideo: string;
  image: string;
}

interface StepForm4 {
  requireLogIn: boolean;
  requireEnroll: boolean;
  price: number;
  discount: number;
}

const Container = styled.div`
  /* margin: 0 45px; */
  width: 100%;
  margin-bottom: 30px;
`;

const SteperContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CourseTap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const NewCourse: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm<StepForm1>();
  // const { control, handleSubmit, getValues, setValue } = useForm<StepForm3>();

  // Initialize different useForm instances for each step
  const formStep1 = useForm<StepForm1>();
  const formStep3 = useForm<StepForm3>();
  const formStep4 = useForm<StepForm4>();

  const steps = ["BASIC", "CURRICULUM", "MEDIA", "PRICE", "PUBLISH"];
  const userId = decodeJWT();
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate();
  const onSubmitStep1: SubmitHandler<StepForm1> = async (data) => {
    // course tạm
    // setCourseId("6736f162ca43ee09c1562c7b");
    if (!courseId) {
      const res = await cursusAPI.courseService.createCourse({
        ...data,
        userId: userId?.sub,
      });
      setCourseId(res.data.data.courseId);
      if (res.status === 201) {
        handleNextStep();
      } else {
        toast.error(res.data.message);
      }
    } else {
      handleNextStep();
    }
  };

  const onSubmitStep3: SubmitHandler<StepForm3> = async (data) => {
    // Logic submit cho bước 3
    if (!data.introVideo || !data.image) {
      toast.error("In MEDIA step please fill all fields");
      return;
    }
    const res = await cursusAPI.courseService.updateCourse(courseId, data);
    if (res.status === 201) {
      toast.success("Done Step 3 successfully");
      handleNextStep();
    } else {
      toast.error(res.data.message);
    }
  };

  const onSubmitStep4: SubmitHandler<StepForm4> = async (data) => {
    if (!data.price || !data.discount) {
      toast.error("In PRICE step please fill all fields");
      return;
    }
    const res = await cursusAPI.courseService.updateCourse(courseId, data);
    if (res.status === 201) {
      toast.success("Done Step 4 successfully");
      handleNextStep();
    } else {
      toast.error(res.data.message);
    }
  };

  const handlePublish = async () => {
    const res = await cursusAPI.courseService.publishCourse(courseId);
    if (res.status === 201) {
      toast.success("Create course successfully");
      navigate(`/`);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleStepSubmit = () => {
    if (currentStep === 1) formStep1.handleSubmit(onSubmitStep1)();
    else if (currentStep === 3) formStep3.handleSubmit(onSubmitStep3)();
    else if (currentStep === 4) formStep4.handleSubmit(onSubmitStep4)();
    else if (currentStep === 5) handlePublish();
    else handleNextStep();
  };

  const handleNextStep = () => {
    // Tăng currentStep mà không submit
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const displayStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <NewCourseStep1
            control={formStep1.control}
            error={formStep1.formState.errors}
          />
        );
      case 2:
        return <NewCourseStep2 courseId={courseId} />;
      case 3:
        return (
          <NewCourseStep3
            control={formStep3.control}
            getValues={formStep3.getValues}
            setValue={formStep3.setValue}
          />
        );
      case 4:
        return (
          <NewCourseStep4
            control={formStep4.control}
            getValues={formStep4.getValues}
            setValue={formStep4.setValue}
          />
        );
      case 5:
        return <NewCourseStep5 />;
      default:
        return (
          <NewCourseStep1
            control={formStep1.control}
            error={formStep1.formState.errors}
          />
        );
    }
  };

  return (
    <Container className="container  mt-4">
      <div className="row ms-4">
        <div className="col-lg-12">
          <h2>
            <IoAnalyticsSharp />
            Create New Course
          </h2>
        </div>
      </div>

      <div className="row ms-4 me-4">
        <div className="col-12">
          <CourseTap className="course_tab_1">
            <SteperContainer>
              <Steper steps={steps} currentStep={currentStep} />
            </SteperContainer>

            <form onSubmit={handleStepSubmit}>
              <div className="steps_content col-12">{displayStepContent()}</div>

              <StepControl
                currentStep={currentStep}
                steps={steps}
                nextStep={handleStepSubmit}
                prevStep={prevStep}
              />
            </form>
          </CourseTap>
        </div>
      </div>
    </Container>
  );
};
