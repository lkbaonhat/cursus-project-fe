import styled from "styled-components";
import { Button } from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "@/routes";

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 50px 0 50px 0;
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const VideoColumn = styled.div`
  flex-grow: 1;
  margin-right: 20px;

  @media screen and (max-width: 992px) {
    margin-right: 0;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const TextColumn = styled.div`
  flex-grow: 1;
  text-align: left;

  @media screen and (max-width: 992px) {
    text-align: center;
    width: 100%;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
  text-align: left;
  @media screen and (max-width: 992px) {
    padding: 0 50px 0 50px;
  }
`;
const Subtitle1 = styled.p`
  font-size: 28px;
  line-height: 1.5;
  margin-bottom: 30px;
  text-align: left;
  font-weight: bold;

  @media screen and (max-width: 992px) {
    font-size: 24px;
    padding: 0 50px 0 50px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 340px;
  aspect-ratio: 16 / 9;
  margin-bottom: 30px;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 992px) {
    align-items: center;
    width: 50%;
    height: auto;
  }
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  color: black;

  a {
    margin: 50px 15px;
    color: black;
    font-weight: bold;
    text-decoration: none;
    position: relative;

    &.active {
      color: #dd3333;
    }

    &:hover::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #dd3333;
      bottom: -5px;
      left: 0;
    }
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  color: black;

  button {
    margin: 0 15px;
    color: black;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;

    &:hover::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #dd3333;
      bottom: -5px;
      left: 0;
    }
  }
`;

const Working = () => {
  const { t } = useTranslation("careers");

  const [activePage, setActivePage] = useState("careers");

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <div>
      <NavBar>
        <Nav>
          <Link
            to={`${ROUTES.ABOUT_US}`}
            className={activePage === "aboutus" ? "active" : ""}
            onClick={() => handlePageChange("aboutus")}
          >
            {t("careers.aboutNav")}
          </Link>
          <Link
            to={`${ROUTES.BLOG_DETAIL}`}
            className={activePage === "blog" ? "active" : ""}
            onClick={() => handlePageChange("blog")}
          >
            {t("careers.blogNav")}
          </Link>
          <Link
            to={`${ROUTES.COMPANY_DETAIL}`} 
            className={activePage === "company" ? "active" : ""}
            onClick={() => handlePageChange("company")}
          >
            {t("careers.companyNav")}
          </Link>
          <Link
            to={`${ROUTES.CAREERS}`}
            className={activePage === "careers" ? "active" : ""}
            onClick={() => handlePageChange("careers")}
          >
            {t("careers.careersNav")}
          </Link>
          <Link
            to={`${ROUTES.PRESS}`}
            className={activePage === "press" ? "active" : ""}
            onClick={() => handlePageChange("press")}
          >
            {t("careers.pressNav")}
          </Link>
        </Nav>
      </NavBar>
      <TitleContainer>
        <Title>{t("careers.title1")}</Title>
      </TitleContainer>
      <ContentContainer>
        <VideoColumn>
          <VideoContainer>
            <Video
              src="https://www.youtube.com/embed/TKnufs85hXk"
              title="YouTube video player"
            />
          </VideoContainer>
        </VideoColumn>
        <TextColumn>
          <Subtitle1>{t("careers.subtitle1")}</Subtitle1>
          <Subtitle>
            Phasellus ex mauris, rhoncus quis posuere sit amet, u ltricies nec
            lorem. Vivamus vestibulum porta urna, in placerat lectus facilisis
            sit amet. Vestibulum non mauris augue. Maecenas arcu magna, aliquam
            imperdiet tempor nec, lobortis ac erat. Aliquam vel magna tortor.
            Cras ornare, enim eu tristique tristique, orci nisl blandit mi, at
            dignissim velit leo nec metus.
          </Subtitle>
          <Button width="250px" border_radius="2px" height="40px">
            {t("careers.button1")}
          </Button>
        </TextColumn>
      </ContentContainer>
    </div>
  );
};

export default Working;
