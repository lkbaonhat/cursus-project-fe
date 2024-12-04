import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectedCourse, selectedQuiz } from "@/modules/course/selector";
import { decodeJWT } from "@/utils/hooks/useUser";
import { clearState } from "@/modules/course/slice";
import "./index.scss";
import Sidebar from "./components/Sidebar";
import QuestionContent from "./components/QuestionContent";
import ConfirmDialog from "./components/ConfirmDialog";
import { STUDENT } from "@/routes";
import { selectIntructerProfile } from "@/modules/global/selector";

const CertificationTest: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizData = useSelector(selectedQuiz);
  const listQuestion = quizData?.questions || [];
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | number[] }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [scoreFinal, setScoreFinal] = useState(0);

  const { quizId } = useParams();
  const userJWT = decodeJWT();
  const user = useSelector(selectIntructerProfile);
  /**
   * get course by course id
   */
  const course = useSelector(selectedCourse);
  //---------------------------End---------------------------//

  /**
   * Reset Redux
   */
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  //---------------------------End---------------------------//


  useEffect(() => {
    dispatch({ type: "getQuiz", payload: quizId });
    return () => dispatch(clearState());
  }, [dispatch, quizId]);

  // Handling answer changes (both single and multiple choice)
  const handleAnswerChange = (questionIndex: number, optionIndex: number | number[], isCorrect: boolean, score: number) => {
    setUserAnswers((prev) => {
      // Handle multiple choice answers as arrays
      const updatedAnswers = Array.isArray(optionIndex) ? optionIndex : [optionIndex];

      return {
        ...prev,
        [questionIndex]: updatedAnswers, // Store as array, not a string
      };
    });
    if (!Array.isArray(optionIndex)) {
      setUserAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex.toString() }));
    }

    // Update the score based on correctness of the answer
    setScoreFinal((prevScore) => (isCorrect ? prevScore + score : prevScore));
  };


  // Handling text answer changes for open-ended questions
  const handleTextAnswerChange = (questionIndex: number, text: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: text }));

    // Validate the user's input and update the score
    const question = listQuestion[questionIndex];
    if ((question?.type === "Single Line Text" || question?.type === "Multi Line Text") && question?.correctAnswer?.trim().toLowerCase() === text.trim().toLowerCase()) {
      // Correct answer
      setScoreFinal((prevScore) => prevScore + question.score);
    } else {
      // Deduct score if incorrect (optional, based on your requirements)
      setScoreFinal((prevScore) => prevScore - question.score);
    }
  };


  // Handling form submission
  const handleSubmit = () => {
    let isPassed: string = "";
    if (scoreFinal >= quizData.passingScore) {
      isPassed = "passed";
      dispatch({
        type: "updateStatusProgressCourse",
        payload: {
          userId: user?._id,
          courseId: course?._id,
          quizId: quizId,
        },
      });
    } else {
      isPassed = "failed";
    }
    dispatch({
      type: "saveResultQuiz",
      payload: {
        quizId: quizData._id,
        userId: user?._id,
        courseId: course?._id,
        score: scoreFinal,
        result: isPassed,
      },
    });
    navigate(`/${user?.role}/${STUDENT.CERTIFICATION_RESULTS}`, {
      state: {
        scoreFinal,
        totalQuestions: listQuestion.length,
        username: user?.fullname,
        quizId: quizData._id,
        courseId: course?._id,
      },
    });
  };


  const handleTimeUp = () => {
    handleSubmit();
  };


  return (
    <div>
      <div className="row mx-5 my-5">
        <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center">
          <Sidebar
            userAnswer={userAnswers}
            onTimeUp={handleTimeUp}
            timeLimit={quizData.timeLimit}
            title={quizData.title}
            questions={listQuestion}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={setCurrentQuestionIndex}
          />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-center">
          <QuestionContent
            question={listQuestion[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={listQuestion.length}
            userAnswer={userAnswers[currentQuestionIndex]}
            onAnswerChange={handleAnswerChange}
            onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
            onPrevious={() => setCurrentQuestionIndex((prev) => prev - 1)}
            onSubmit={() => setShowConfirm(true)}
            onTextAnswerChange={handleTextAnswerChange}
          />
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default CertificationTest;
