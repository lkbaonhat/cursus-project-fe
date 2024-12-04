import { Button } from "@/components/atoms/Button/Button";
import styled from "styled-components";
import {
  CloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Modals/Modals";
import FormContainer from "./components/Assignment/FormContainer";
import { useForm, SubmitHandler } from "react-hook-form";
import BasicTab from "./components/Quiz/Basic";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectedSections } from "@/modules/course/selector";

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

interface FormData {
  title: string;
  description: string;
  timeDuration: number;
  totalNumber: number;
  minPassNumber: number;
  uploadLimit: number;
  maxAttachmentSize: number;
  uploadedFiles: Array<{ id: number; name: string; url: string }>;
}

interface AssignmentProps {
  onHine: () => void;
  sectionId: string;
  isUpdate: (value: boolean) => void;
  assignmentId?: string;
}

const Assignment = (props: AssignmentProps) => {
  const { control, getValues, setValue, handleSubmit, reset } =
    useForm<FormData>({
      defaultValues: {
        title: "",
        description: "",
        timeDuration: 0,
        totalNumber: 0,
        minPassNumber: 0,
        uploadLimit: 0,
        maxAttachmentSize: 0,
        uploadedFiles: [],
      },
    });
  const dispatch = useDispatch();
  const listSection = useSelector(selectedSections);

  if (props.assignmentId) {
    const assignment = listSection.map((section) => section.listAssignment).flat().find((assignment) => assignment._id === props.assignmentId);
    if (assignment) {
      setValue("title", assignment.title);
      setValue("description", assignment.description);
      setValue("timeDuration", assignment.timeDuration);
      setValue("totalNumber", assignment.totalNumber);
      setValue("minPassNumber", assignment.minPassNumber);
      setValue("uploadLimit", assignment.uploadLimit);
      setValue("maxAttachmentSize", assignment.maxAttachmentSize);
      setValue("uploadedFiles", assignment.uploadedFiles);
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    e?.preventDefault();
    if (!data.title || !data.description) {
      toast.error("Title and description are required");
      return;
    }
    if (!data.timeDuration || !data.totalNumber || !data.minPassNumber || !data.uploadLimit || !data.maxAttachmentSize) {
      toast.error("Time duration, total number, min pass number, upload limit, max attachment size are required");
      return;
    }
    try {
      if (props.assignmentId) {
        dispatch({ type: 'updateAssignmentByAssignmentId', payload: { ...data, assignmentId: props.assignmentId } });
      } else {
        dispatch({ type: 'addAsignmentBySectionId', payload: { ...data, sectionId: props.sectionId } });
      }
      props.isUpdate(true);
      reset();
      props.onHine();
    } catch (error) {
      console.error("Error creating assignment:", error);
    }


  };

  return (
    <div>
      <ModalHeader>
        <ModalHeaderTitle>Add Assignment</ModalHeaderTitle>
        <CloseButton type="button" onClick={props.onHine}>
          &times;
        </CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <BasicTab control={control} tilte="Assignment title*" />
          <FormContainer
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        </ModalBody>

        <ModalFooter>
          <ModalButtonFooter>
            <button type="button" onClick={props.onHine} className="btn_close">
              Close
            </button>
            {props.assignmentId ?
              <Button
                type="button"
                width="170px"
                height="40px"
                margin="0px"
                border_radius="4px"
                onClick={handleSubmit(onSubmit)}
              >
                Update Assignment
              </Button>
              :
              <Button
                type="button"
                width="150px"
                height="40px"
                margin="0px"
                border_radius="4px"
                onClick={handleSubmit(onSubmit)}
              >
                Add Assignment
              </Button>
            }

          </ModalButtonFooter>
        </ModalFooter>
      </form>
    </div>
  );
};

export default Assignment;
