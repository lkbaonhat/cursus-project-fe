import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookSquare } from "react-icons/fa";
import "./index.scss";
import { ROUTES } from "@/routes";
import  { useState } from 'react';
import { useTranslation } from "react-i18next";


const Press = () => {
  const { t } = useTranslation("press");

  const [activePage, setActivePage] = useState('press');

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="container-fluid p-0">
      <div className="wrapper">
      <div className="navbar">
          <div className="nav">
            <Link to={`${ROUTES.ABOUT_US}`} className={activePage === 'aboutus' ? 'active' : ''} onClick={() => handlePageChange('aboutus')}>
              {t("press.aboutNav")}
            </Link>
            <Link to={`${ROUTES.BLOG_DETAIL}`} className={activePage === 'blog' ? 'active' : ''} onClick={() => handlePageChange('blog')}>
            {t("press.blogNav")}
            </Link>
            <Link to={`${ROUTES.COMPANY_DETAIL}`}  className={activePage === 'company' ? 'active' : ''} onClick={() => handlePageChange('company')}>
            {t("press.companyNav")}
            </Link>
            <Link to={`${ROUTES.CAREERS}`} className={activePage === 'careers' ? 'active' : ''} onClick={() => handlePageChange('careers')}>
            {t("press.careersNav")}
            </Link>
            <Link to={`${ROUTES.PRESS}`} className={activePage === 'press' ? 'active' : ''} onClick={() => handlePageChange('press')}>
            {t("press.pressNav")}
            </Link>
          </div>
        </div>
        <div className="header">
          <h2 className="press-title">{t("press.mainHeading")}</h2>
        </div>
        <div className="press-content">
          <div className="press-sidebar">
            <button className="t-button">
              <FaTwitter className="icon" />
              {t("press.follow")}
            </button>
            <button className="f-button">
              <FaFacebookSquare className="icon" />
              {t("press.follow")}
            </button>
            <p>{t("press.learn")}</p>
            <Link to={`${ROUTES.HELP}`}>
            {t("press.help")}
            </Link>
          </div>
          <div className="press-main-content">
            <h2 className="news-title">{t("press.title1")}</h2>
            <p className="news-inquiry">
              {t("press.subtitle1")}{" "}
              <Link to="#">press@cursus.com</Link>
            </p>
            <div className="news-list">
              {[1, 2, 3].map((item) => (
                <div className="news-item" key={item}>
                  <p className="date"> {t("press.date")}</p>
                  <h3 className="news-title-list"> {t("press.newstitle")}</h3>
                  <p className="news-description">
                    Donec eget arcu vel mauris lacinia vestibulum id eu elit.
                    Nam metus odio, iaculis eu nunc et, interdum mollis arcu.
                    Pellentesque viverra faucibus diam. In sit amet laoreet
                    dolor, vitae fringilla quam...
                  </p>
                  <Link to="#" className="read-more">
                  {t("press.read")}
                  </Link>
                </div>
              ))}
              <Link to="#" className="see-more">{t("press.more1")}</Link>
            </div>

            <h2 className="news-title-2">{t("press.title2")}</h2>
            <p className="news-inquiry">
            {t("press.subtitle2")}
            </p>
            <div className="news-list">
              {[1, 2, 3].map((item) => (
                <div className="news-item" key={item}>
                  <p className="date">{t("press.date")}</p>
                  <Link to="#" className="title-link">
                  {t("press.releasetitle")}
                  </Link>
                </div>
              ))}
              <Link to="#" className="see-more">{t("press.more2")}</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
