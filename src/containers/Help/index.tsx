import React, { useState } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { BiWallet } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaRegFileAlt } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import { BsWindow } from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { FaCloud, FaBook } from "react-icons/fa6";
import { CiMobile3 } from "react-icons/ci";
import { useTranslation } from "react-i18next";

// Styled Components
const Header = styled.div`
  background-color: #333;
  color: white;
  text-align: center;
  font-size: 15px;
  width: 100%;
  padding: 80px 0;
  position: relative;

  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
`;
const Tag = styled.div`
  margin: 30px 0px 20px;

  h3 {
    font-size: 20px;
  }
`;

const Content = styled.div`
  h5 {
    font-size: 18px;
    margin-bottom: 9px;
  }
  p {
    font-size: 14px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  color: black;

  .nav-link {
    color: black;
  }

  .nav-tabs .nav-link.active {
    color: #333 !important;
    background-color: transparent !important;
    border-color: inherit !important;
    border-top: 0 !important;
    border-bottom: 2px solid #ed2a26 !important;
    border-left: 0 !important;
    border-right: 0 !important;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 10px 40px 10px 60px;
  border-radius: 4px;
  border: 1px solid #ccc;

  ::placeholder {
    color: #888;
    opacity: 0.2;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 50%;
  margin: 0 auto;
`;

const SearchIcon = styled(IoMdSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #888;
  margin-left: 10px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 3px;
  padding: 20px;
  border: 1px solid #efefef;
  box-shadow: none;
  flex: 1;
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
  height: 200px;

  .backgroundIcons {
    background: #ffecec;
    border-radius: 3px;
    padding: 12px 20px;
    display: inline-block;
    font-size: 36px;
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const Icons = styled.div`
  margin-top: -8px;
  font-size: 36px;
`;

const FaqItem = styled.div`
  background: #fff;
  border-radius: 3px;
  border: 1px solid #efefef;
  padding: 20px;
  box-shadow: none;
  flex: 1;
  color: #333 !important;
  width: 100%;
  font-size: 14px;
  line-height: 26px;
  font-weight: 500;
  text-align: center;
  margin: 30px 0px 20px;
`;

const Help: React.FC = () => {
  const { t } = useTranslation("help"); // Changed namespace to 'help'
  const [activeTab, setActiveTab] = useState("Instructor");
  const navigate = useNavigate(); 

  // Dữ liệu cho Instructor
  const instructorData = [
    {
      title: t("help.payments"),
      description: t("help.instructor_payments_description"),
      icon: <BiWallet />,
      link: "/certificate/faq-detail-2",
    },
    {
      title: t("help.selling_promotion"),
      description: t("help.instructor_selling_promotion_description"),
      icon: <HiOutlineSpeakerphone />,
      link: "/certificate/faq-detail",
    },
    {
      title: t("help.quality_standards"),
      description: t("help.instructor_quality_standards_description"),
      icon: <FaRegFileAlt />,
      link: "/certificate/faq-detail-2",
    },
    {
      title: t("help.course_building"),
      description: t("help.instructor_course_building_description"),
      icon: <LuFileEdit />,
      link: "/certificate/faq-detail",
    },
    {
      title: t("help.course_management"),
      description: t("help.instructor_course_management_description"),
      icon: <BsWindow />,
      link: "/certificate/faq-detail",
    },
    {
      title: t("help.trust_safety"),
      description: t("help.instructor_trust_safety_description"),
      icon: <AiOutlineSafety />,
      link: "/certificate/faq-detail",
    },
  ];

  const instructorFaqData = [
    t("help.promote_course"),
    t("help.cursus_course_quality"),
    t("help.instructor_revenue_share"),
    t("help.instructor_promotional_agreements"),
    t("help.how_to_become_instructor"),
    t("help.how_to_select_payout_method"),
  ];

  // Dữ liệu cho Student
  const studentData = [
    {
      title: t("help.getting_started"),
      description: t("help.student_getting_started_description"),
      icon: <LuFileEdit />,
    },
    {
      title: t("help.account_profile"),
      description: t("help.student_account_profile_description"),
      icon: <VscAccount />,
    },
    {
      title: t("help.troubleshooting"),
      description: t("help.student_troubleshooting_description"),
      icon: <FaCloud />,
    },
    {
      title: t("help.course_taking"),
      description: t("help.student_course_taking_description"),
      icon: <FaBook />,
    },
    {
      title: t("help.purchase_refunds"),
      description: t("help.student_purchase_refunds_description"),
      icon: <BiWallet />,
    },
    {
      title: t("help.mobile"),
      description: t("help.student_mobile_description"),
      icon: <CiMobile3 />,
    },
  ];

  const studentFaqData = [
    t("help.lifetime_access"),
    t("help.cursus_faq"),
    t("help.downloading_courses"),
    t("help.certificate_of_completion"),
    t("help.refund_a_course"),
    t("help.how_to_solve_payment_issues"),
  ];

  return (
    <div className="help-page">
      {/* Header */}
      <Header>
        <h1>{t("help.how_may_we_help_you")}</h1>
        <SearchContainer>
          <StyledInput
            type="text"
            placeholder={t("help.search_for_solutions")}
          />
          <SearchIcon />
        </SearchContainer>
      </Header>
      {/* Tabs */}
      <TabContainer>
        <Nav tabs>
          <NavItem>
            <NavLink
              href="#"
              active={activeTab === "Instructor"}
              onClick={() => setActiveTab("Instructor")}
            >
              {t("help.instructor")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              active={activeTab === "Student"}
              onClick={() => setActiveTab("Student")}
            >
              {t("help.student")}
            </NavLink>
          </NavItem>
        </Nav>
      </TabContainer>

      {/* Topics */}
      <Container>
        {activeTab === "Instructor" && (
          <>
            <Tag>
              <h3>{t("help.select_a_topic")}</h3>
            </Tag>
            <Row>
              {instructorData.map((item, index) => (
                <Col md="4" key={index}>
                  <Card
                    onClick={() => navigate(item.link)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="backgroundIcons">
                      <Icons>{item.icon}</Icons>
                    </div>
                    <Content>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </Content>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* FAQ cho Instructor */}
            <Tag>
              <h3>{t("help.frequently_asked_questions")}</h3>
            </Tag>
            <Row>
              {instructorFaqData.map((faq, index) => (
                <Col md="4" key={index}>
                  <Content>
                    <FaqItem>{faq}</FaqItem>
                  </Content>
                </Col>
              ))}
            </Row>
          </>
        )}

        {activeTab === "Student" && (
          <>
            <Tag>
              <h3>{t("help.select_a_topic")}</h3>
            </Tag>
            <Row>
              {studentData.map((item, index) => (
                <Col md="4" key={index}>
                  <Card>
                    <div className="backgroundIcons">
                      <Icons>{item.icon}</Icons>
                    </div>
                    <Content>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </Content>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* FAQ cho Student */}
            <h3>{t("help.frequently_asked_questions")}</h3>
            <Row>
              {studentFaqData.map((faq, index) => (
                <Col md="4" key={index}>
                  <FaqItem>{faq}</FaqItem>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Help;
