// Result.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import TitlePages from "@/components/atoms/Title";
import { useTranslation } from "react-i18next";
import { decodeJWT } from "@/utils/hooks/useUser";
import { STUDENT } from "@/routes";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuizResult } from "@/modules/course/selector";
import { selectIntructerProfile } from "@/modules/global/selector";

const Result: React.FC = () => {
  const { t } = useTranslation("result");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userJWT = decodeJWT();
  const {
    scoreFinal = 0,
    totalQuestions = 0,
    username,
    quizId,
    courseId,
  } = location.state || {};
  const quizResult = useSelector(selectedQuizResult);
  const wrongCount = totalQuestions - scoreFinal;
  const userId = userJWT?.sub;
  const user = useSelector(selectIntructerProfile);

  const fetchQuizResult = useCallback(() => {
    if (quizId && userId) {
      dispatch({
        type: "getQuizResult",
        payload: { quizId, userId },
      });
    }
  }, [quizId, userId, dispatch]);

  useEffect(() => {
    fetchQuizResult();
  }, [fetchQuizResult]);

  const handleNext = () => {
    navigate(
      `/${user?.role}/${STUDENT.COURSE_CONTENT.replace(
        ":courseSlug",
        courseId
      )}`
    );
  };

  const handleTryAgain = () => {
    navigate(
      `/${user?.role}/${STUDENT.CERTIFICATION_TEST.replace(":quizId", quizId)}`
    );
  };

  const isPassed = quizResult?.result;

  return (
    <>
      <TitlePages breadcrumbs={[]} titleName={t("result.result")} />
      <div className="result-page">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <div className="result-circles">
                <div className="test_result_bg">
                  <ul className="test_result_left">
                    <li>
                      <div className="result_dt">
                        <i className="score-right">{scoreFinal}</i>
                        <p>{t("result.right")}</p>
                      </div>
                    </li>
                    <li>
                      <div className="result_dt">
                        <i className="score-wrong">{wrongCount}</i>
                        <p>{t("result.wrong")}</p>
                      </div>
                    </li>
                    <li>
                      <div className="result_dt">
                        <h4>{totalQuestions}</h4>
                        <p>{t("result.out_of", { count: totalQuestions })}</p>
                      </div>
                    </li>
                  </ul>
                  {isPassed === "passed" ? (
                    <div className="result-content-test">
                      <h2>{t("result.congratulations", { name: username })}</h2>
                      <p>{t("result.eligible_for_certificate")}</p>
                      <button className="btn-next" onClick={handleNext}>
                        {t("result.next")}
                      </button>
                    </div>
                  ) : (
                    <div className="result-content-test">
                      <h2>{t("result.fail_to_complete")}</h2>
                      <p>{t("result.not_eligible")}</p>
                      <button
                        className="btn-try-again"
                        onClick={handleTryAgain}
                      >
                        {t("result.try_again")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
