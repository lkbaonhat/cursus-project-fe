import { useRef, useState } from "react";
import styled from "styled-components";
import { style } from "@/theme";
import {
  FaRegEdit,
  FaRegFileAlt,
  FaRegDotCircle,
  FaRegCheckCircle,
  FaRegPlusSquare,
  FaCheck,
  FaSave
} from "react-icons/fa";
import { uploadFile } from "@/utils/firebase/uploadFile";
import { useForm, Controller } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  form {
    margin-bottom: 16px;
  }
`;

const Button = styled.button<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? `${style.colors.red.bg}` : "#fff"};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border: 1px solid ${style.colors.gray.bg_card_under};
  padding: 10px 15px;
  margin: 10px 10px 0 0;
  border-radius: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${style.colors.gray.bg_card_under};
  border-radius: 5px;
  outline: none;
`;

const Label = styled.label`
  font-weight: bold;
  color: #686f7a;
`;

const AddButton = styled(Button)`
  background-color: ${style.colors.red.bg};
  color: white;
  margin-top: 10px;
  /* width: 50%; */
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  button {
    border: none;
    outline: none;
    background-color: ${style.colors.white.bg};
  }
  img {
    max-width: 70px;
    height: auto;
    background-color: ${style.colors.white.bg};
    /* object-fit: cover; */
    border: 1px solid ${style.colors.gray.bg_card_under};
    border-radius: 10px;
  }
  input {
    display: none;
  }
`;

const AnswerQuestion = styled.div`
  margin: 16px 0;
`;

interface Option {
  id: number;
  title: string;
  isCorrect: boolean;
}

export interface Question {
  type: string;
  question: string;
  score: number;
  options?: Option[];
  correctAnswer?: string;
  imageQuestion?: Array<{ id: number; name: string; url: string }>;
}

interface QuestionProps {
  onSave: (question: Question) => void;
}

const QuestionForm = (props: QuestionProps) => {
  const { control, handleSubmit, getValues, reset, watch } = useForm<Question>({
    defaultValues: {
      type: "Single Choice",
      question: "",
      score: 1,
      correctAnswer: "",
      options: [],
      imageQuestion: [],
    },
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const fileInputRefImages = useRef<HTMLInputElement | null>(null);
  const selectType = watch("type");

  const handleUploadComplete = async (file: File) => {
    setLoading(true);
    try {
      const url = await uploadFile(file, "images");
      setImageUrl(url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, { id: Date.now(), title: "", isCorrect: false }]);
  };

  const handleOptionChange = (id: number, value: string) => {
    if (selectType === "Single Choice")
      return setOptions(
        options.map((option) =>
          option.id === id ? { ...option, title: value } : option
        )
      );
    else if (selectType === "Multiple Choice")
      return setOptions(
        options.map((option) =>
          option.id === id
            ? { ...option, title: value, isCorrect: true }
            : option
        )
      );
  };

  // Adjusted handleCorrectAnswerChange function for single and multiple choice
  const handleCorrectAnswerChange = (id: number) => {
    if (selectType === "Single Choice") {
      setOptions(
        options.map((option) => ({ ...option, isCorrect: option.id === id }))
      );
    } else if (selectType === "Multiple Choice") {
      setOptions(
        options.map((option) =>
          option.id === id
            ? { ...option, isCorrect: !option.isCorrect }
            : option
        )
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: Question, e: any) => {
    e?.preventDefault();
    const formText = {
      type: data.type,
      question: data.question,
      score: data.score,
      correctAnswer: data.correctAnswer,
      imageQuestion: imageUrl
        ? [{ id: Date.now(), name: "", url: imageUrl }]
        : [],
    };

    const formChoice = {
      type: data.type,
      question: data.question,
      score: data.score,
      options: options,
      imageQuestion: imageUrl
        ? [{ id: Date.now(), name: "", url: imageUrl }]
        : [],
    };
    if (selectType === "Single Choice" || selectType === "Multiple Choice") {
  
      props.onSave(formChoice);
    } else {
      props.onSave(formText);
    }
    //onSave({ ...data, options, imageQuestion: [{ id: Date.now(), name: "", url: imageUrl || "" }] });
    reset();
    setShow(false);
    setImageUrl(null);
    setOptions([]);
  };

  return (
    <FormContainer>
      <AddButton type="button" onClick={() => setShow(!show)}>
        <FaRegPlusSquare /> Add Question
      </AddButton>

      {show && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <Label>Question Type</Label>
            <div className="col-12">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <>
                    <Button
                      type="button"
                      active={selectType === "Single Choice"}
                      onClick={() => field.onChange("Single Choice")}
                    >
                      <FaRegDotCircle /> Single Choice
                    </Button>
                    <Button
                      type="button"
                      active={selectType === "Multiple Choice"}
                      onClick={() => field.onChange("Multiple Choice")}
                    >
                      <FaRegCheckCircle /> Multiple Choice
                    </Button>
                    <Button
                      type="button"
                      active={selectType === "Single Line Text"}
                      onClick={() => field.onChange("Single Line Text")}
                    >
                      <FaRegEdit /> Single Line Text
                    </Button>
                    <Button
                      type="button"
                      active={selectType === "Multi Line Text"}
                      onClick={() => field.onChange("Multi Line Text")}
                    >
                      <FaRegFileAlt /> Multi Line Text
                    </Button>
                  </>
                )}
              />
            </div>
          </div>

          <AnswerQuestion className="row">
            <ImageContainer className="col-2">
              <Label>Image*</Label>
              <button
                type="button"
                onClick={() => fileInputRefImages.current?.click()}
              >
                {loading ? (
                  <img
                    src="https://gambolthemes.net/html-items/cursus-new-demo/images/placeholder-image.png"
                    alt="Loading"
                  />
                ) : imageUrl ? (
                  <img src={imageUrl} alt="Preview" />
                ) : (
                  <img
                    src="https://gambolthemes.net/html-items/cursus-new-demo/images/placeholder-image.png"
                    alt="Loading"
                  />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRefImages}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadComplete(file);
                }}
              />
            </ImageContainer>

            <div className="col-6">
              <Label>Question Title*</Label>
              <Controller
                name="question"
                control={control}
                rules={{ required: "Question title is required" }}
                render={({ field }) => (
                  <Input placeholder="Enter question title" {...field} />
                )}
              />
            </div>

            <div className="col-4">
              <Label>Score*</Label>
              <Controller
                name="score"
                control={control}
                rules={{ required: "Score is required" }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
          </AnswerQuestion>

          {(getValues("type") === "Single Line Text" ||
            getValues("type") === "Multi Line Text") && (
              <Controller
                name="correctAnswer"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Enter Correct Answer" {...field} />
                )}
              />
            )}

          {(getValues("type") === "Single Choice" ||
            getValues("type") === "Multiple Choice") && (
              <>
                <AddButton type="button" onClick={handleAddOption}>
                  Add Option
                </AddButton>
                {options.map((option) => (
                  <div key={option.id} className="row">
                    <div className="col-10">
                      <Input
                        placeholder="Enter option"
                        value={option.title}
                        onChange={(e) =>
                          handleOptionChange(option.id, e.target.value)
                        }
                      />
                    </div>
                    <div className="col-2">
                      <Button
                        type="button"
                        active={option.isCorrect}
                        onClick={() => handleCorrectAnswerChange(option.id)}
                      >
                        {option.isCorrect ? (
                          <FaCheck color="white" />
                        ) : (
                          <FaXmark color="red" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}

          <AddButton type="button" onClick={handleSubmit(onSubmit)}>
            <FaSave />  Save Question
          </AddButton>
        </form>
      )}
    </FormContainer>
  );
};

export default QuestionForm;
