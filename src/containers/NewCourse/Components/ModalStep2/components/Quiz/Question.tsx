import { useState } from "react";
import QuestionForm from "./Question/QuestionForm";
import QuestionTypeList from "./Question/QuestionTypeList";
import { toast } from "react-toastify";

interface QuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: any;
}
const Question = (props: QuestionProps) => {
  const [questions, setQuestions] = useState<MODEL.Question[]>([]);

  const handleSaveQuestion = (newQuestion: MODEL.Question) => {
    const updatedQuestion = [...questions, newQuestion];
    props.setValue("questions", updatedQuestion);
    setQuestions(updatedQuestion);
  };

  const handleDeleteQuestion = (id: number) => {
    toast.error("chưa làm delete đâu đừng án ;-;");
  };

  const handleUpdateQuestion = (updatedQuestion: MODEL.Question) => {
    toast.error("chưa làm update đâu đừng án ;-;");
  };

  return (
    <div>
      <QuestionForm onSave={handleSaveQuestion} />
      <QuestionTypeList
        onUpdate={handleUpdateQuestion}
        questions={props.getValues("questions")}
        onDelete={handleDeleteQuestion}
      />
    </div>
  );
};

export default Question;
