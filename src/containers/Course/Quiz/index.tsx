import { useSelector } from "react-redux";
import "./index.scss";
import { selectedCourse, selectedQuiz } from "@/modules/course/selector";
import { Link } from "react-router-dom";
import { STUDENT } from "@/routes";
import { decodeJWT } from "@/utils/hooks/useUser";
import { selectIntructerProfile, selectProgressCourseOfUser } from "@/modules/global/selector";
import { IoIosCheckmarkCircle } from "react-icons/io";

const CourseQuiz = () => {
  const quiz = useSelector(selectedQuiz);
  const courseProgress = useSelector(selectProgressCourseOfUser);
  const courseProgressQuiz = courseProgress?.sections?.flatMap(
    (section: any) => section.quizzes
  );
  const status = courseProgressQuiz?.find(
    (item: any) => item.quizId === quiz._id
  )?.status;

  const user = useSelector(selectIntructerProfile);

  return (
    <div className="container-fluid p-0">
      <div className="course-quiz">
        <h1>Requirements and Architecture</h1>
        <h2>Review Learning Objective</h2>
        <p>Review concepts related to your current learning objectives:</p>
        <ul>
          <li>
            Interpret the given situation and recommend the missing engineering
            practices causing that situation
          </li>
          <li>
            Select the appropriate engineering practices for a given situation
          </li>
          <li>Describe the key engineering practices and their purpose</li>
        </ul>
        {status === "not-learn" ? (
          <Link
            to={`/${user?.role}/${STUDENT.CERTIFICATION_TEST.replace(
              ":quizId",
              quiz._id
            )}`}
            className="btn-coursequiz"
          >
            Start
          </Link>
        ) : (
          <button className="btn-quiz-done" disabled>
            <IoIosCheckmarkCircle size={16} style={{ marginRight: "5px" }} />
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseQuiz;
