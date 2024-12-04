import { useEffect, useState } from "react";
import { Modal } from "@/components/organisms/Modals/Modals";
import NewSection from "../ModalStep2/NewSection";
import Lecture from "../ModalStep2/Lecture";
import Quiz from "../ModalStep2/Quiz";
import Assignment from "../ModalStep2/Assignment";
import CurriculumHeader from "./components/Step2/CurriculumHeader";
import Section from "./components/Step2/Section";
import ListComponent from "@/containers/Profile/components/ListComponent/ListComponent";
import AddItemBar from "./components/Step2/AddItemBar";
import { FaFileAlt, FaStream, FaClipboardList, FaEdit, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { style } from "@/theme";
import { useDispatch, useSelector } from "react-redux";
import { selectedSections } from "@/modules/course/selector";

interface NewCourseStep2Props {
  courseId: string;
}

const ContentSectionContainer = styled.div`
  padding: 10px 20px 20px 20px;
`
const ContentSection = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: ${style.colors.gray.bg};
  display: flex;
  gap: 4px;
  align-items: center;
  border-radius: 10px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  .eidt-delete{
    visibility: hidden;
  }
  &:hover{
    .deletebutton{
      visibility: visible;
      color: ${style.colors.purple.COLOR_WORD};
      cursor: pointer;
    }
    .editbutton{
      visibility: visible;
      color: ${style.colors.purple.COLOR_WORD};
      cursor: pointer;
    }
  }
  button{
    border: none;
    outline: none;
    background-color: ${style.colors.gray.bg};
  }
`

const NewCourseStep2 = (props: NewCourseStep2Props) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [modalState, setModalState] = useState({
    modalSection: false,
    modalLecture: false,
    modalQuiz: false,
    modalAssignment: false,
  });
  const [currentSectionId, setCurrentSectionId] = useState('');
  const [currentLectureId, setCurrentLectureId] = useState('');
  const [currentQuizId, setCurrentQuizId] = useState('');
  const [currentAssignmentId, setCurrentAssignmentId] = useState('');

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const openModal = (modalName: string, sectionId?: string, id?: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
    setCurrentSectionId(sectionId || ''); // Đặt sectionId hoặc để trống

    if (sectionId) setCurrentSectionId(sectionId);
    if (modalName === "modalLecture" && id) setCurrentLectureId(id);
    if (modalName === "modalQuiz" && id) setCurrentQuizId(id);
    if (modalName === "modalAssignment" && id) setCurrentAssignmentId(id);
  };

  const closeModal = (modalName: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
    setCurrentSectionId(''); // Reset sectionId khi đóng modal
  };

  const dispatch = useDispatch();
  const listSections = useSelector(selectedSections)

  const handleisUpdate = () => {
    setIsUpdate(true);
  }

  const handleDeleteSection = (sectionId: string) => {
    setIsUpdate(true);
    return dispatch({ type: 'deleteSectionBySectionId', payload: sectionId });
  }

  useEffect(() => {
    dispatch({ type: 'getAllSectionsByCourseId', payload: props.courseId });
    if (isUpdate) {
      setIsUpdate(false);
    }
  }, [isUpdate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <CurriculumHeader onNewSectionClick={() => openModal("modalSection")} />
      {listSections.length > 0 && (
        <ListComponent
          data={listSections}
          renderItem={(section) => (
            <Section
              section={section}
              onEditSection={() => openModal("modalSection", section._id)}
              onDeleteSection={() => handleDeleteSection(section._id)}
            >
              <ContentSectionContainer className="container">
                {section.listLecture && (
                  section.listLecture.map((item: ICourse.Lecture, index: number) => (
                    <div className="row">
                      <ContentSection key={index} >
                        <div className="d-flex align-items-center gap-3">
                          <FaFileAlt />{item.title}
                        </div>

                        <div className="eidt-delete d-flex align-items-center gap-3">
                          <button type="button" onClick={() => openModal("modalLecture", section._id, item._id)} className="editbutton">
                            <FaEdit />
                          </button>
                          <button type="button" className="deletebutton">
                            <FaTrashAlt />
                          </button>
                        </div>
                      </ContentSection>
                    </div>
                  ))
                )}

                {section.listQuiz && (
                  section.listQuiz.map((item: ICourse.Quiz, index: number) => (
                    <div className="row">
                      <ContentSection key={index} >
                        <div className="d-flex align-items-center gap-3">
                          <FaStream />{item.title}
                        </div>

                        <div className="eidt-delete d-flex align-items-center gap-3">
                          <button type="button" onClick={() => openModal("modalQuiz", section._id, item._id)} className="editbutton">
                            <FaEdit />
                          </button>
                          <button type="button" className="deletebutton">
                            <FaTrashAlt />
                          </button>
                        </div>
                      </ContentSection>
                    </div>
                  ))
                )}

                {section.listAssignment && (
                  section.listAssignment.map((item: ICourse.Assignment, index: number) => (
                    <div className="row">
                      <ContentSection key={index} >
                        <div className="d-flex align-items-center gap-3">
                          <FaClipboardList />{item.title}
                        </div>

                        <div className="eidt-delete d-flex align-items-center gap-3">
                          <button type="button" onClick={() => openModal("modalAssignment", section._id, item._id)} className="editbutton">
                            <FaEdit />
                          </button>
                          <button type="button" className="deletebutton">
                            <FaTrashAlt />
                          </button>
                        </div>
                      </ContentSection>
                    </div>
                  ))
                )}
              </ContentSectionContainer>

              <AddItemBar
                onAddLecture={() => openModal("modalLecture", section._id)}
                onAddQuiz={() => openModal("modalQuiz", section._id)}
                onAddAssignment={() => openModal("modalAssignment", section._id)}
              />
            </Section>
          )}
        />
      )}


      <Modal show={modalState.modalSection} size={isMobile ? "small" : "large"}>
        <NewSection
          courseId={props.courseId}
          onHine={() => closeModal("modalSection")}
          isUpdate={handleisUpdate}
          sectionId={currentSectionId}
        />
      </Modal>

      <Modal show={modalState.modalLecture} size={isMobile ? "small" : "large"}>
        <Lecture
          sectionId={currentSectionId}
          onHide={() => closeModal("modalLecture")}
          isUpdate={handleisUpdate}
          lectureId={currentLectureId}
        />
      </Modal>

      <Modal show={modalState.modalQuiz} size={isMobile ? "small" : "large"}>
        <Quiz
          sectionId={currentSectionId}
          onHine={() => closeModal("modalQuiz")}
          isUpdate={handleisUpdate}
          quizId={currentQuizId}
        />
      </Modal>

      <Modal show={modalState.modalAssignment} size={isMobile ? "small" : "large"}>
        <Assignment
          sectionId={currentSectionId}
          onHine={() => closeModal("modalAssignment")}
          isUpdate={handleisUpdate}
          assignmentId={currentAssignmentId}
        />
      </Modal>
    </div>
  );
};

export default NewCourseStep2;
