import { Button } from "@/components/atoms/Button/Button";
import {
  CloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Modals/Modals";
import styled from "styled-components";
import Tab from "./components/Tab";
import { FaFileAlt } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { memo } from "react";
import Question from "./components/Quiz/Question";
import Setting from "./components/Quiz/Setting";
import BasicTab from "./components/Quiz/Basic";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectedSections } from "@/modules/course/selector";
// import  BasicTab  from "./components/Quiz/Basic"

const ModalHeaderTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  
`;
const ModalButtonFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
  .btn_close {
    background-color: #f3f3f3;
    color: #91699c;
    border: none;
    border-radius: 4px;
    padding: 8px 14px;
    font-weight: 500;
    &:hover {
      color: #333;
    }
  }
`;
interface Option {
  id: number;
  title: string;
  isCorrect: boolean;
}

interface Question {
  type: string;
  question: string;
  score: number;
  options?: Option[];
  correctAnswer?: string;
  imageQuestion?: Array<{ id: number; name: string; url: string }>;
}
interface QuizFormProps {
  title: string;
  description: string;
  questions: Array<Question>;
  quizGradable: boolean;
  showTime: boolean;
  timeLimit: number;
  passingScore: number;
  questionLimit: number;
}

interface QuizProps {
  onHine: () => void;
  sectionId: string;
  isUpdate: (value: boolean) => void;
  quizId?: string;
}

const Quiz = (props: QuizProps) => {
  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<QuizFormProps>({
      defaultValues: {
        title: "",
        description: "",
        questions: [],
        quizGradable: false,
        showTime: false,
        timeLimit: 0,
        passingScore: 0,
        questionLimit: 0,
      },
    });
  const dispatch = useDispatch();
  const listSection = useSelector(selectedSections);

  if (props.quizId) {
    const quiz = listSection.map((section) => section.listQuiz).flat().find((quiz) => quiz._id === props.quizId);
    if (quiz) {
      setValue("title", quiz.title);
      setValue("description", quiz.description);
      setValue("questions", quiz.questions);
      setValue("quizGradable", quiz.quizGradable);
      setValue("showTime", quiz.showTime);
      setValue("timeLimit", quiz.timeLimit);
      setValue("passingScore", quiz.passingScore);
      setValue("questionLimit", quiz.questionLimit);
    }
  }

  const onSubmit: SubmitHandler<QuizFormProps> = async (data, e) => {
    e?.preventDefault();
    if (!data.title || !data.description) {
      toast.error("Title and description are required");
      return;
    }
    if (!data.questions.length) {
      toast.error("Question is required");
      return;
    }
    if (!data.timeLimit || !data.passingScore || !data.questionLimit) {
      toast.error("In SETTING step please fill all fields");
      return;
    }

    try {
      if (props.quizId) {
        dispatch({ type: 'updateQuizByQuizId', payload: { ...data, quizId: props.quizId } });
      } else {
        dispatch({ type: 'addQuizBySectionId', payload: { ...data, sectionId: props.sectionId } });
      }
      props.isUpdate(true);
      reset();
      props.onHine();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  // Memoized components for optimization
  const MemoizedBasicTab = memo(() => {
    return <BasicTab control={control} tilte="Quiz title*" />;
  });

  const MemoizedQuestionTab = memo(() => {
    return <Question getValues={getValues} setValue={setValue} />;
  });

  const MemoizedSettingTab = memo(() => {
    return <Setting control={control} setValue={setValue} />;
  });
  // Usage Example with dynamic tab data
  const tabsData = [
    {
      index: 1,
      name: "Basic",
      state: true,
      icon: <FaFileAlt />,
      component: <MemoizedBasicTab />,
    },
    {
      index: 2,
      name: "Quesions",
      state: false,
      icon: <BsFillQuestionCircleFill />,
      component: <MemoizedQuestionTab />,
    },
    {
      index: 3,
      name: "Setting",
      state: false,
      icon: <IoMdSettings />,
      component: <MemoizedSettingTab />,
    },
  ];

  return (
    <div>
      <ModalHeader>
        <ModalHeaderTitle>Add Quiz</ModalHeaderTitle>
        <CloseButton type="button" onClick={props.onHine}>
          &times;
        </CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Tab tabs={tabsData} />
        </ModalBody>

        <ModalFooter>
          <ModalButtonFooter>
            <button type="button" onClick={props.onHine} className="btn_close">
              Close
            </button>
            {props.quizId ?
              <Button
                type="button"
                width="110px"
                height="40px"
                margin="0px"
                border_radius="4px"
                onClick={handleSubmit(onSubmit)}
              >
                Update Quiz
              </Button>
              :
              <Button
                type="button"
                width="110px"
                height="40px"
                margin="0px"
                border_radius="4px"
                onClick={handleSubmit(onSubmit)}
              >
                Add Quiz
              </Button>
            }
          </ModalButtonFooter>
        </ModalFooter>
      </form>
    </div>
  );
};

export default Quiz;
