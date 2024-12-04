import Header3 from "@/components/templates/Header/header3";
import FooterCourse from "@/components/templates/Footer/FooterCourse/FooterCourse";
import "@/layouts/styles/layout.main.scss";
import {
  selectIntructerProfile,
  selectProgressCourseOfUser,
  selectState,
} from "@/modules/global/selector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SidebarCourse } from "@/containers/SidebarCourse/Sidebar";
import "@/layouts/styles/layout.course.scss";
import { useParams } from "react-router-dom";
import { ROUTES, STUDENT } from "@/routes";
import {
  selectedCourse,
  selectedQuizResult,
  selectedSections,
} from "@/modules/course/selector";
import { decodeJWT } from "@/utils/hooks/useUser";
import { clearState } from "@/modules/course/slice";

const LayoutCourse = ({ Component }: any) => {
  const isOpen = useSelector(selectState).isOpen;

  const [widthContent, setWidthContent] = useState(250);
  useEffect(() => {
    if (isOpen) {
      setWidthContent(245);
    } else {
      setWidthContent(0);
    }
  }, [isOpen]);


  /**
   * Get user
   */
  const userRedux = useSelector(selectIntructerProfile);
  //---------------------------End---------------------------//

  /**
   * Get course by course id
   */
  const dispatch = useDispatch();
  const { courseSlug } = useParams();
  const { lectureId, quizId } = useParams();
  useEffect(() => {
    if (courseSlug) {
      dispatch({ type: "getCourse", payload: courseSlug });
    }
  }, [courseSlug]);
  const course = useSelector(selectedCourse);
  //---------------------------End---------------------------//

  /**
   * Get section by course id
   */
  useEffect(() => {
    dispatch({ type: "getAllSectionsByCourseId", payload: courseSlug });
  }, [courseSlug]);
  const sections = useSelector(selectedSections);
  //---------------------------End---------------------------//

  /**
   * Get list lecture by section id
   */
  useEffect(() => {
    dispatch({ type: "getLectureById", payload: lectureId });
  }, [lectureId]);
  //---------------------------End---------------------------//

  /**
   * Get list quiz by quiz id
   */
  useEffect(() => {
    dispatch({ type: "getQuiz", payload: quizId });
  }, [quizId]);
  //---------------------------End---------------------------//

  /**
   * Get quiz result by user id and quiz id
   */
  const user = decodeJWT();
  // const quizIds =
  //   sections?.flatMap((section) =>
  //     section.listQuiz?.map((quiz: any) => quiz._id)
  //   ) || [];
  // useEffect(() => {
  //   if (quizIds.length > 0) {
  //     quizIds.forEach((quizId) => {
  //       dispatch({
  //         type: "getQuizResult",
  //         payload: { userId: user?.sub, quizId: quizId },
  //       });
  //     });
  //   }
  // }, [quizIds]);
  // const quizResult = useSelector(selectedQuizResult);
  //---------------------------End---------------------------//

  /**
   * Get process course of user
   */
  const courseProgress = useSelector(selectProgressCourseOfUser);

  useEffect(() => {
    if (courseSlug) {
      dispatch({
        type: "getProcessCourseOfUser",
        payload: { userId: user?.sub, courseId: courseSlug },
      });
    }
  }, [courseProgress]);
  //---------------------------End---------------------------//

  /**
   * Update status progress course
   **/

  const handleUpdateProgress = () => {
    dispatch({
      type: "updateStatusProgressCourse",
      payload: {
        userId: user?.sub,
        courseId: courseSlug,
        lectureId: lectureId ? lectureId : null,
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lectureId) {
        handleUpdateProgress(); // Cập nhật lecture hoặc quiz
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [lectureId, quizId]);
  //---------------------------End---------------------------//

  /**
   * Clear state when unmount
   */
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  //---------------------------End---------------------------//

  const courseProgressLecture = courseProgress?.sections?.flatMap(
    (section: any) => section.lectures
  );
  const courseProgressQuiz = courseProgress?.sections?.flatMap(
    (section: any) => section.quizzes
  );
  const courseProgressAssignment = courseProgress?.sections?.flatMap(
    (section: any) => section.assignments
  );

  /**
   * Props for SidebarContent
   */
  const slideItems = sections?.map((item: any) => {
    const dropdownItems = item.listLecture?.map((lecture: any) => ({
      label: lecture.title,
      link: `/${userRedux?.role}/${STUDENT.LEARNING_VIDEO.replace(
        ":courseSlug",
        item.courseId
      ).replace(":lectureId", lecture._id)}`,
      time: lecture.duration,
      iconType: "play",
      status: courseProgressLecture?.find(
        (progress: any) => progress.lectureId === lecture._id
      )?.status,
      lectureId: lecture._id,
    }));

    const dropdownQuiz = item.listQuiz?.map((quiz: any) => ({
      label: quiz.title,
      link: `/${userRedux?.role}/${STUDENT.LEARNING_QUIZ.replace(
        ":courseSlug",
        item.courseId
      ).replace(":quizId", quiz._id)}`,
      time: `${quiz.timeLimit} mins`,
      iconType: "pen",
      status: courseProgressQuiz?.find(
        (progress: any) => progress.quizId === quiz._id
      )?.status,
      quizId: quiz._id,
    }));

    const dropdownAssignment = item.listAssignment?.map((ass: any) => ({
      label: ass.title,
      link: `/${userRedux?.role}/${STUDENT.LEARNING_ASSIGNMENT.replace(
        ":courseSlug",
        item.courseId
      ).replace(":assignmentId", ass._id)}`,
      time: `${ass.timeDuration} mins`,
      iconType: "pen",
      status: courseProgressAssignment?.find(
        (progress: any) => progress.assignmentId === ass._id
      )?.status,
      assignmentId: ass._id,
    }));

    return {
      content: item.name,
      // number: `0/${dropdownItems.concat(dropdownQuiz, dropdownAssignment).length
      //   } | 11:11`,
      dropdown: dropdownItems.concat(dropdownQuiz, dropdownAssignment),
    };
  });

  const lengthLecture = slideItems.reduce(
    (acc, item) => acc + item.dropdown.length,
    0
  );

  const linkDropdown = slideItems
    .map((item) => item.dropdown.map((item: any) => item.link))
    .flat();
  //---------------------------End---------------------------//

  return (
    <div className="layout-main">
      <div className="header">
        <Header3 title={course?.title ?? ""} lengthLecture={lengthLecture} />
      </div>

      <div className="main-content">
        <div className={`sidebar ${isOpen ? "" : "closed"}`}>
          <SidebarCourse slideItems={slideItems} />
        </div>

        <div
          className="content"
          style={{ width: `calc(100% - ${widthContent}px)` }}
        >
          <div className="component">
            <Component />
          </div>
        </div>
      </div>

      <div className="footer">
        <FooterCourse linkDropdown={linkDropdown} />
      </div>
    </div>
  );
};

export default LayoutCourse;
