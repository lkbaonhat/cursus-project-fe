import { Button } from "@/components/atoms/Button/Button";
import { CloseButton, ModalBody, ModalFooter, ModalHeader } from "@/components/organisms/Modals/Modals";
import { InputField } from "@/components/organisms/TextField/Input";
import { selectedSections } from "@/modules/course/selector";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector, } from "react-redux";
import styled from "styled-components";

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

// Define form input types
interface IFormInput {
  name: string;
}

interface NewSectionProps {
  onHine: () => void;
  courseId: string;
  isUpdate: (value: boolean) => void;
  sectionId?: string
}

const NewSection: React.FC<NewSectionProps> = (props: NewSectionProps) => {
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<IFormInput>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    event?.preventDefault(); // Ngăn trang reload lại
    try {
      if (props.sectionId) {
        dispatch({
          type: 'updateSectionbySectionId',
          payload: { sectionId: props.sectionId, name: data.name }
        });
      } else {
        dispatch({
          type: 'addSectionsByCourseId',
          payload: { courseId: props.courseId, name: data.name }
        });
      }
      props.isUpdate(true);
      props.onHine(); // Đóng modal
      reset({ name: '' });
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  const listSection = useSelector(selectedSections);

  if (props.sectionId) {
    const section = listSection.find((section) => section._id === props.sectionId);
    if (section) {
      setValue('name', section.name);
    }
  }

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>New Section</ModalHeaderTitle>
        <CloseButton type="button" onClick={props.onHine}>&times;</CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <ModalHeaderTitle>Section name*</ModalHeaderTitle>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Section name is required" }}
            render={({ field }) => (
              <InputField
                width="100%"
                placeholder="Section title here"
                isFocused={true}
                {...field}
              />
            )}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </ModalBody>

        <ModalFooter>
          <ModalButtonFooter>
            <button onClick={props.onHine} type="button" className="btn_close">Close</button>
            <Button
              width="130px" height="40px" margin="0px"
              border_radius="4px" type="button"
              onClick={handleSubmit(onSubmit)}
            >
              {props.sectionId ? "Update Section" : "Add Section"}
            </Button>
          </ModalButtonFooter>
        </ModalFooter>
      </form >
    </>
  );
};

export default NewSection;
