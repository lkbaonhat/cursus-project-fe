import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiCodeView } from "react-icons/ri";
import { BsBarChart } from "react-icons/bs";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { TfiRulerAlt } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { BiBookReader } from "react-icons/bi";
import { FiCamera } from "react-icons/fi";
import { HiOutlineMusicNote } from "react-icons/hi";
import { useTranslation } from "react-i18next";

export const CardTCContainer = styled.div`
  background-color: #ffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  border-radius: 3px;
`;

export const CardTCHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #efefef;
  h4 {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    margin: 0;
  }
`;

export const CardTCBody = styled.div`
  a {
    display: block;
    width: 100%;
    padding: 10px 20px;
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    color: #686f7a;
    text-align: left;
    text-decoration: none;
    .ct-item {
      margin-right: 10px;
      font-size: 120%;
    }
  }

  a:hover {
    background-color: #efefef;
    font-size: large;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }
`;

export default function CardTopCategori() {
  const { t } = useTranslation("home");

  const btn = [
    { content: t("home.develop"), icon: <RiCodeView className="ct-item" />, link: '/category/development' },
    { content: t("home.bussiness"), icon: <BsBarChart className="ct-item" />, link: '/category/business' },
    {
      content: t("home.it_and_software"),
      icon: <HiOutlineComputerDesktop className="ct-item" />,
      link: '/category/it-and-software'
    },
    { content: t("home.design"), icon: <TfiRulerAlt className="ct-item" />, link: '/category/design' },
    { content: t("home.marketing"), icon: <FaChartLine className="ct-item" />, link: '/category/marketing' },
    {
      content: t("home.personal_development"),
      icon: <BiBookReader className="ct-item" />,
      link: '/category/personal-development'
    },
    { content: t("home.photography"), icon: <FiCamera className="ct-item" />, link: '/category/photography' },
    { content: t("home.music"), icon: <HiOutlineMusicNote className="ct-item" />, link: '/category/music' },
  ];

  const renderItem = btn.map((item, index) => {
    return (
      <Link to={item.link} key={index}>
        {item.icon}
        {item.content}
      </Link>
    );
  });

  return (
    <CardTCContainer>
      <CardTCHeader>
        <h4>{t("home.top_categories")}</h4>
      </CardTCHeader>
      <CardTCBody>{renderItem}</CardTCBody>
    </CardTCContainer>
  );
}