import { Button } from "@/components/atoms/Button/Button";
import { CloseButton, ModalBody, ModalFooter, ModalHeader } from "@/components/organisms/Modals/Modals";
import styled from "styled-components";
import { style } from "@/theme";
import Tab from "./components/Tab";
import { FaFileAlt } from "react-icons/fa";
import { HiVideoCamera } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";
import VideoTab from "./components/Lecture/Video";
import { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BasicTab from "./components/Lecture/Basic";
import AttachmentsTab from "./components/Lecture/Attachment";
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
    background-color: ${style.colors.gray.bg_card_under};
    color: ${style.colors.purple.COLOR_WORD};
    border: none;
    border-radius: 4px;
    padding: 8px 14px;
    font-weight: 500;
    &:hover {
      color: #333;
    }
  }
`;

interface LectureFormData {
  sectionId: string | null;
  title: string;
  description: string;
  freePreview: boolean;
  videoUrl: string;
  videoPosterUrl: string;
  duration: string;
  uploadedFiles: Array<{ id: number; name: string; url: string }>;
}

interface LectureProps {
  onHide: () => void;
  sectionId?: string;
  isUpdate: (value: boolean) => void;
  lectureId?: string;
}
const Lecture = (props: LectureProps) => {
  const { control, handleSubmit, setValue, getValues, reset } = useForm<LectureFormData>({
    defaultValues: {
      sectionId: "",
      title: "",
      description: "",
      freePreview: false,
      videoUrl: "",
      duration: "",
      videoPosterUrl: "",
      uploadedFiles: [],
    },
  });

  const dispatch = useDispatch();
  const listSection = useSelector(selectedSections);
  if (props.lectureId) {
    const lecture = listSection.map((section) => section.listLecture).flat().find((lecture) => lecture._id === props.lectureId);
    if (lecture) {
      setValue("title", lecture.title);
      setValue("description", lecture.description);
      setValue("freePreview", lecture.freePreview);
      setValue("videoUrl", lecture.videoUrl);
      setValue("videoPosterUrl", lecture.videoPosterUrl);
      setValue("duration", lecture.duration);
      setValue("uploadedFiles", lecture.uploadedFiles);
    }
  }

  const onSubmit: SubmitHandler<LectureFormData> = async (data, e) => {
    e?.preventDefault();
    if (!data.title || !data.description) {
      toast.error("In BASIC step please fill all fields");
      return;
    }
    if (!data.videoUrl || !data.videoPosterUrl || !data.duration) {
      toast.error("In VIDEO step please fill all fields");
      return;
    }


    try {
      if (props.lectureId) {
        dispatch({ type: 'updateLectureByLectureId', payload: { ...data, lectureId: props.lectureId } });
      } else {
        dispatch({ type: 'addLectureBySectionId', payload: { ...data, sectionId: props.sectionId } });
      }
      props.isUpdate(true);
      reset();
      props.onHide();
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };

  const MemoizedBasicTab = memo(() => <BasicTab control={control} />);
  const MemoizedVideoTab = memo(() => <VideoTab control={control} setValue={setValue} getValues={getValues} />);
  const MemoizedAttachmentsTab = memo(() => <AttachmentsTab control={control} setValue={setValue} getValues={getValues} />); // Memoized version of AttachmentsTab

  const tabsData = [
    { index: 1, name: "Basic", state: true, icon: <FaFileAlt />, component: <MemoizedBasicTab /> },
    { index: 2, name: "Video", state: false, icon: <HiVideoCamera />, component: <MemoizedVideoTab /> },
    { index: 3, name: "Attachments", state: false, icon: <LuPaperclip />, component: <MemoizedAttachmentsTab /> },
  ];

  return (
    <div>
      <ModalHeader>
        <ModalHeaderTitle>Add Lecture</ModalHeaderTitle>
        <CloseButton type="button" onClick={props.onHide}>&times;</CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Tab tabs={tabsData} />
        </ModalBody>

        <ModalFooter>
          <ModalButtonFooter>
            <button type="button" onClick={props.onHide} className="btn_close">
              Close
            </button>
            {props.lectureId ?
              <Button
                width="150px"
                height="40px"
                margin="0px"
                border_radius="4px"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Update Lecture
              </Button>
              :
              <Button
                width="110px"
                height="40px"
                margin="0px"
                border_radius="4px"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Add Lecture
              </Button>
            }
          </ModalButtonFooter>
        </ModalFooter>
      </form>
    </div>
  );
};

export default Lecture;
