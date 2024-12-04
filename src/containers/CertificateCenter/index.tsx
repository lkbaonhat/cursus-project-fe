import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Person from "@/containers/CertificateCenter/components/Person/Person";
import Selection from "@/containers/CertificateCenter/components/Selection/Selection";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { INSTRUCTOR, ROLE, STUDENT } from "@/routes";
import { useTranslation } from 'react-i18next';
import { decodeJWT } from '@/utils/hooks/useUser';
import { selectIntructerProfile } from "@/modules/global/selector";
import { useSelector } from "react-redux";

// Interface certificate value
interface Certificate {
  id: string;
  name: string;
  category: string;
}

// Mock API
const mockCertificates: Certificate[] = [
  { id: "1", name: "John Doe", category: "Development" },
  { id: "2", name: "Jane Smith", category: "Marketing" },
  { id: "3", name: "Alice Johnson", category: "Design" },
];

// Interface form input
interface CertificateFormInputs {
  certNumber: string;
  fullName: string;
  category: string;
}

const CertificateCenter = () => {
  const { t } = useTranslation('certificate');

  const user = useSelector(selectIntructerProfile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFormInputs>();
  const [foundCertificate, setFoundCertificate] =
    React.useState<Certificate | null>(null);

  const [searchAttempted, setSearchAttempted] = useState(false);
  const onSubmit: SubmitHandler<CertificateFormInputs> = (data) => {
    const { certNumber, fullName, category } = data;

    const result = mockCertificates.find(
      (cert) =>
        cert.id === certNumber &&
        cert.name.toLowerCase() === fullName.toLowerCase() &&
        cert.category === category
    );

    if (result) {
      setFoundCertificate(result);
    } else {
      setFoundCertificate(null);
    }
    setSearchAttempted(true);
  };

  useEffect(() => {
    const sampleCertificate = mockCertificates[0];
    setFoundCertificate(sampleCertificate);
  }, []);

  //Navigate to certificate form
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user?.role === 'student') {
      navigate(`/${ROLE.STUDENT}/${STUDENT.CERTIFICATION_FORM}`);
    }
    else if (user?.role === 'instructor') {
      navigate(`/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CERTIFICATION_FORM}`);
    };
  }

  return (
    <div className="container-fluid p-0">
      <div className="t-container">
        <h1>{t('certificate.title')}</h1>
        <p>{t('certificate.subtitle')}</p>
        <div className="img-container">
          <img
            src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo1.svg"
            alt="logo1"
          />
          <img
            src="https://gambolthemes.net/html-items/cursus-new-demo/images/cerificate_center/plus.svg"
            alt="plus"
            className="img-mark"
          />
          <img
            src="https://gambolthemes.net/html-items/cursus-new-demo/images/cerificate_center/certicon.svg"
            alt="certificon"
          />
        </div>
        <button className="start-btn" onClick={handleButtonClick}>
          {t('certificate.start_certificate')}
        </button>
      </div>

      <div className="i-container">
        <h2>{t('certificate.find_certificate')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="i-wrapper mt-3">
            <div className="form-group">
              <input
                type="text"
                className={`form-control mb-3 ${errors.certNumber ? "is-invalid" : ""
                  }`}
                placeholder={t('certificate.certificate_number')}
                {...register("certNumber", {
                  required: t('certificate.cert_number_required'),
                })}
              />
              {errors.certNumber && (
                <span className="error-text">{errors.certNumber.message}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={`form-control mb-3 ${errors.fullName ? "is-invalid" : ""
                  }`}
                placeholder={t('certificate.full_name')}
                {...register("fullName", { required: t('certificate.full_name_required') })}
              />
              {errors.fullName && (
                <span className="error-text">{errors.fullName.message}</span>
              )}
            </div>
            <div className="form-group">
              <div className="select-container">
                <select
                  className="form-control mb-3"
                  {...register("category", {
                    required: t('certificate.category_required'),
                  })}
                >
                  <option value="" hidden>
                    {t('certificate.select_category')}
                  </option>
                  <option value="Development">{t('certificate.development')}</option>
                  <option value="Finance & Accounting">{t('certificate.finance_accounting')}</option>
                  <option value="Design">{t('certificate.design')}</option>
                  <option value="Marketing">{t('certificate.marketing')}</option>
                  <option value="Teaching & Academics">{t('certificate.teaching_academics')}</option>
                </select>
                <IoMdArrowDropdown size={20} className="icon" />
              </div>
              {errors.category && (
                <span className="error-text">{errors.category.message}</span>
              )}
            </div>

            <button type="submit" className="fi-btn">
              {t('certificate.find_certificate')}
            </button>
          </div>
        </form>

        {searchAttempted &&
          (foundCertificate ? (
            <div className="result">
              <h3>{t('certificate.certificate_found')}</h3>
              <p>{t('certificate.id')}: {foundCertificate.id}</p>
              <p>{t('certificate.name')}: {foundCertificate.name}</p>
              <p>{t('certificate.category')}: {foundCertificate.category}</p>
            </div>
          ) : (
            <div className="no-result">
              <p>{t('certificate.no_certificate_found')}</p>
            </div>
          ))}
      </div>

      <Selection />

      <Person />

      <div className="d-container">
        <h2>{t('certificate.what_you_get')}</h2>
        <p className="subtitle">
          {t('certificate.cursus_company')}
        </p>
        <p className="description">
          {t('certificate.description')}
        </p>
        <button className="d-button">{t('certificate.knowledge_base')}</button>
      </div>
    </div>
  );
};

export default CertificateCenter;