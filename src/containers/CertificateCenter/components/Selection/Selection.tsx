import { useState } from "react";
import styled from "styled-components";
import { fonts } from "@/theme/fonts";
import { useTranslation } from 'react-i18next';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 80px 0;
  background-color: rgb(255, 249, 249);

  @media (max-width: 992px) {
    width: 100%;
    padding: 60px 50px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 575px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: ${fonts.size.superLarge};
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
  font-family: ${fonts.family.tertiary};
`;

const Subtitle = styled.p`
  font-size: ${fonts.size.large};
  color: #777;
  margin-bottom: 50px;
  font-family: ${fonts.family.tertiary};

   @media (max-width: 768px) {
    text-align: center;
  }
`;

// Tab Navigation
const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;

  @media (max-width: 992px) {
    padding: 0 110px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    padding: 0 100px;
  }
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  background-color: ${(props) => (props.active ? "#ed2a26" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  margin-left: 5px;
  white-space: wrap;
  font-size: ${fonts.size.large};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  font-family: ${fonts.family.tertiary};

  &:hover {
    background-color: ${(props) => (props.active ? "#ed2a26" : "#ed2a26")};
    color: ${(props) => (props.active ? "#fff" : "#fff")};
  }

  @media (max-width: 992px) {
    margin: -10px;
  }

  @media (max-width: 768px) {
    font-size: ${fonts.size.medium};
    padding: 8px 15px;
  }
`;

// Certification grid
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

// Certification Card
const Card = styled.a`
  background-color: white;
  padding: 20px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  cursor: pointer;
  text-decoration: none;

  font-size: ${fonts.size.large};
  font-weight: ${fonts.weight.medium};
  margin: 10px;
  font-family: "Roboto", sans-serif;
  color: #000;

  &:hover {
    background-color: red;
    color: white;
  }

  @media (max-width: 992px) {
    flex: 0 0 auto;
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
    font-size: ${fonts.size.medium};
  }
`;

type CertificationCategory =
  | "Development"
  | "Finance & Accounting"
  | "Design"
  | "Marketing"
  | "Teaching & Academics";

interface CertificationsData {
  [key: string]: string[];
}

const Selection = () => {
  const { t } = useTranslation('certificate');
  const [activeTab, setActiveTab] =
    useState<CertificationCategory>("Development");

    const certificationsData: CertificationsData = {
      Development: [
        t('certificate.HTMLCSS'),
        t('certificate.WordPress'),
        t('certificate.MotoCMS3'),
        t('certificate.Joomla'),
        t('certificate.OpenCart'),
        t('certificate.JoomlaPro'),
        t('certificate.WordPressPro'),
        t('certificate.WordPressElementor'),
        t('certificate.WordPressElementorPro'),
        t('certificate.PrestaShop'),
      ],
      "Finance & Accounting": [
        t('certificate.Accounting'),
        t('certificate.FinanceFundamentals'),
        t('certificate.Bookkeeping'),
        t('certificate.PoliticalScience'),
        t('certificate.Finance'),
        t('certificate.Cryptocurrency'),
      ],
      Design: [
        t('certificate.AdobePhotoshop'),
        t('certificate.AdobeIllustrator'),
        t('certificate.AdobeAfterEffects'),
        t('certificate.AdobeInDesign'),
        t('certificate.Unity'),
        t('certificate.Drawing'),
        t('certificate.GameDevelopmentFundamentals'),
        t('certificate.3DModeling'),
        t('certificate.MotionGraphics'),
        t('certificate.2DAnimation'),
        t('certificate.TShirtDesign'),
      ],
      Marketing: [
        t('certificate.SEO'),
        t('certificate.GoogleAds'),
        t('certificate.GoogleAdsCertification'),
        t('certificate.SocialMarketing'),
        t('certificate.EmailMarketing'),
        t('certificate.BusinessStrategy'),
        t('certificate.PPCAdvertising'),
        t('certificate.Blogging'),
      ],
      "Teaching & Academics": [
        t('certificate.Math'),
        t('certificate.Humanities'),
        t('certificate.Engineering'),
        t('certificate.Science'),
        t('certificate.SocialScience'),
        t('certificate.EnglishLanguage'),
        t('certificate.GermanLanguage'),
        t('certificate.SignLanguage'),
        t('certificate.IELTS'),
        t('certificate.FrenchLanguage'),
        t('certificate.SpanishLanguage'),
        t('certificate.EnglishGrammar'),
      ],
    };
    

    return (
      <Container>
        <Title>{t('certificate.ourCertification')}</Title>
        <Subtitle>{t('certificate.certificateSubtitle')}</Subtitle>
  
        <Tabs>
          {Object.keys(certificationsData).map((category) => (
            <Tab
              key={category}
              active={activeTab === category}
              onClick={() => setActiveTab(category as CertificationCategory)}
            >
              {t(`certificate.${category}`)} 
            </Tab>
          ))}
        </Tabs>
  
        <Grid>
  {certificationsData[activeTab].map((certification, index) => (
    <Card key={index}> {certification} </Card>
  ))}
</Grid>
      </Container>
    );
};

export default Selection;
