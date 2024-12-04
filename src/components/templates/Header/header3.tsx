import { Logo } from "@/components/atoms/Logo/Logo";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import "@/components/templates/Header/header3.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectProgressCourseOfUser } from "@/modules/global/selector";

interface Header3Props {
  title: string;
  lengthLecture: number;
}

export default function Header3(props: Header3Props) {
  const { t } = useTranslation(["header"]);

  const progress = useSelector(selectProgressCourseOfUser);
  const handleDownloadCertificate = () => {
    const link = document.createElement("a");
    link.href = "https://firebasestorage.googleapis.com/v0/b/cursus-e431a.appspot.com/o/certificate%2F462555395_1124526955713420_474816662132995755_n.png?alt=media&token=27d25569-3d46-4d81-b0e3-695fa78897b2";
    link.download = "https://firebasestorage.googleapis.com/v0/b/cursus-e431a.appspot.com/o/certificate%2F462555395_1124526955713420_474816662132995755_n.png?alt=media&token=27d25569-3d46-4d81-b0e3-695fa78897b2";
    link.click();
  };
  return (
    <div className="header-3 d-flex justify-content-center align-items-center">
      <div className="header-left">
        <Link to={`${ROUTES.HOME}`}>
          <Logo
            src="https://gambolthemes.net/html-items/cursus-new-demo/images/sign_logo.png"
            width="35px"
            cursor="pointer"
          />
        </Link>
        <div className="course-title">{props.title}</div>
      </div>

      <div className="header-right">
        <div className="progress-section">
          <div className="progress-circle" >
            <span className="progress-text">{`${progress.progress}%`}</span>
          </div>
        </div>
        {progress.progress === 100 && (
          <button
            className="btn-download-certificate"
            onClick={handleDownloadCertificate}
          >
            {t("header.download_certificate")}
          </button>
        )}
      </div>
    </div>
  );
}
