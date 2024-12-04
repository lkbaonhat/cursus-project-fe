import { Logo } from "@/components/atoms/Logo/Logo";
import { Link } from "react-router-dom";
import "@/components/templates/Header/headerQuiz.scss";
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
import { selectedCourse } from "@/modules/course/selector";
import { STUDENT } from "@/routes";
import { selectIntructerProfile } from "@/modules/global/selector";
export default function HeaderQuiz() {
  const { t } = useTranslation(['header']);
  const course = useSelector(selectedCourse);
  const user = useSelector(selectIntructerProfile)
  return (
    <div className="header-quiz-main">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header-quiz-left">
              <Link className="back-to-courses" to={`/${user?.role}/${STUDENT.COURSE_CONTENT.replace(
                ':courseSlug',
                course?._id
              )}`}>{t('header.backtocourses')}</Link>
            </div>
            <div className="ml-item">
              <div className="main_logo">
                <Link to={"/"}>
                  <Logo src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
