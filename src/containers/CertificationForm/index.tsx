import React, { useState } from "react";
import "./index.scss";
import TitlePages from "@/components/atoms/Title";
import { Container, Row, Col, Input, Button, FormGroup, Form as BootstrapForm } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { ROLE, INSTRUCTOR, STUDENT } from "@/routes";
import { useSelector } from "react-redux";
import { selectIntructerProfile } from "@/modules/global/selector";

interface Category {
  name: string;
  subCategories: string[];
}


const CertificationForm: React.FC = () => {
  const { t } = useTranslation('certificate');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const user = useSelector(selectIntructerProfile);
  
const breadcrumbs = [
  { name: t('certificate.home'), path: "/" },
  { name: t('certificate.certificationCenter'), path: user?.role === 'instructor' 
    ? `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CERTIFICATE_CENTER}` 
    : `/${ROLE.STUDENT}/${STUDENT.CERTIFICATE_CENTER}`  },
  { name: t('certificate.certificationFillForm'), path: "" },
];

const categories: Category[] = [
  {
    name: t('certificate.Development'),
    subCategories: [
      t('certificate.WordPress'),
      t('certificate.HTMLCSS'),
      t('certificate.FullTime'), 
      t('certificate.MotoCMS3'),
      t('certificate.Joomla'),
      t('certificate.OpenCart'),
      t('certificate.JoomlaPro'),
      t('certificate.WordPressPro'),
      t('certificate.WordPressElementor'),
      t('certificate.PrestaShop'),
    ],
  },
  {
    name: t('certificate.Finance & Accounting'),
    subCategories: [
      t('certificate.Accounting'),
      t('certificate.FinanceFundamentals'),
      t('certificate.Bookkeeping'),
      t('certificate.PoliticalScience'),
      t('certificate.Finance'),
      t('certificate.Cryptocurrency'),
    ],
  },
  {
    name: t('certificate.Design'),
    subCategories: [
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
  },
  {
    name: t('certificate.Marketing'),
    subCategories: [
      t('certificate.GoogleAds'),
      t('certificate.GoogleAdsCertification'),
      t('certificate.SocialMarketing'),
      t('certificate.EmailMarketing'),
      t('certificate.BusinessStrategy'),
      t('certificate.SEO'),
      t('certificate.PPCAdvertising'),
      t('certificate.Blogging'),
    ],
  },
  {
    name: t('certificate.Teaching & Academics'),
    subCategories: [
      t('certificate.Math'),
      t('certificate.Humanities'),
      t('certificate.Engineering'),
      t('certificate.Science'),
      t('certificate.SocialScience'),
      t('certificate.EnglishLanguage'),
      t('certificate.GermanLanguage'),
      t('certificate.SignLanguage'),
      t('certificate.FrenchLanguage'),
      t('certificate.SpanishLanguage'),
      t('certificate.EnglishGrammar'),
      t('certificate.IELTS'),
    ],
  },
];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "fullName") {
      setFullName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  // Hàm xử lý sự kiện khi chọn sub-category
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleToggle = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <Container className="certificate-form">
      <TitlePages
        breadcrumbs={breadcrumbs}
        titleName={t('certificate.certificationFormTitle')} 
      />
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="form-container">
            <h2>{t('certificate.fillBeforeStart')}</h2>
            <BootstrapForm onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder={t('certificate.fullNamePlaceholder')}
                  name="fullName"
                  value={fullName}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  placeholder={t('certificate.emailPlaceholder')}
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="tel"
                  placeholder={t('certificate.phoneNumberPlaceholder')}
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <h3>{t('certificate.selectCategory')}</h3>
              {categories.map((category) => (
                <div key={category.name}>
                  <div
                    onClick={() => handleToggle(category.name)}
                    className={`category-header ${openCategory === category.name ? "open" : ""}`}
                  >
                    {category.name}
                    <span>{openCategory === category.name ? "-" : "+"}</span>
                  </div>
                  <div className={`sub-category ${openCategory === category.name ? "open" : ""}`}>
                    {category.subCategories.map((subCategory) => (
                      <div key={subCategory}>
                        <input
                          type="radio"
                          id={subCategory}
                          name="category"
                          value={subCategory}
                          onChange={handleCategoryChange}
                        />
                        <label htmlFor={subCategory}>{subCategory}</label> 
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="privacy-policy">
              {t('certificate.privacyPolicyText1')}
                <a href="#"> {t('certificate.privacyPolicyText2')} </a> and
                 <a href="#"> {t('certificate.privacyPolicyText3')}</a>.
              </div>
              <Button className="save" type="submit">
                {t('certificate.letsGoButton')}
              </Button>
              <div className="text">
              {t('certificate.readyForQuestions1')} 
                <span> {t('certificate.readyForQuestions2')} </span> 
                {t('certificate.readyForQuestions3')}  
                <span> {t('certificate.readyForQuestions4')}</span>.
              </div>
            </BootstrapForm>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CertificationForm;