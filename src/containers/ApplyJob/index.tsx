import { ROUTES } from "@/routes";
import { Link } from "react-router-dom";
import "./index.scss";
import { useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ApplyJob = () => {
  const { t } = useTranslation("applyjob");

  // Create a ref for the application form
  const formRef = useRef<HTMLDivElement | null>(null);

  // Function to handle button click and scroll to the form
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container-fluid p-0">
      
      {/* Title */}
      <div className="title-wrapper">
        <div className="title">
          <Link to={`${ROUTES.HOME}`}>{t("applyjob.home")}</Link> /{" "}
          <Link to={`${ROUTES.CAREERS}`}>{t("applyjob.career")}</Link> /{" "}
          <span>{t("applyjob.dataengineer")}</span>
          <h2>{t("applyjob.dataengineer")}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="content-wrapper">
        <div className="content">
          <button className="apply-button" onClick={scrollToForm}>
            {t("applyjob.applyforthisjob")}
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            volutpat maximus pellentesque. Integer sem enim, luctus at nibh at,
            condimentum sagittis sapien. Sed tempus ipsum erat, sit amet
            efficitur velit interdum eu. Vestibulum hendrerit id dolor eu
            scelerisque. Phasellus ex dui, consequat nec feugiat eu, dapibus
            eget ante. Sed sodales interdum dui, at euismod mi feugiat
            hendrerit. Suspendisse auctor libero in tempor mollis. Nulla et
            dolor velit. Aliquam sit amet luctus quam.
          </p>

          <h3>{t("applyjob.whatwillyoubedoing")}</h3>
          <p>
            Nam a egestas libero, eget eleifend turpis. Sed id ipsum a ipsum
            aliquam laoreet sit amet sit amet nibh. Proin dapibus, libero sed
            posuere rhoncus, orci mi cursus enim, at accumsan eros massa lacinia
            mi. Nunc eget finibus felis, volutpat malesuada sem. Aliquam ac nisl
            pellentesque, varius neque sit amet, porttitor nunc. Nullam elit
            tellus, dapibus non eleifend sed, hendrerit eget velit. Aliquam ut
            felis dictum, tincidunt magna vitae, aliquam massa. In porttitor
            tristique quam, non dignissim sapien pharetra ultrices. Cras non
            ante non velit mollis mollis. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Quisque et
            bibendum urna, eget consequat sapien. Integer sed condimentum nibh.
            Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec
            nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et
            enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus
            a pretium vel, ultrices porta nisl. Etiam lobortis dictum tincidunt.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Suspendisse ultricies efficitur dui, suscipit tempus elit
            condimentum quis. Duis sed vestibulum tortor, eget cursus odio.
          </p>

          <h3>{t("applyjob.whatarewelookingfor")}</h3>
          <ol>
            <li>
              Work closely with other data engineers to enhance infrastructure,
              improve reliability, and strengthen database performance
            </li>

            <li>
              Collaborate with data scientists, product managers, marketers and
              other data-driven internal stakeholders to identify opportunities
              for better dat access and usage
            </li>

            <li>
              Contribute to the ongoing development of the data warehouse
              ecosystem
            </li>

            <li>
              Become the expert on all aspects of Edututs+'s data reporting and
              analytic infrastructure
            </li>

            <li>
              Develop and maintain data definitions for internally available
              data sources
            </li>
          </ol>

          <h3>{t("applyjob.whoshouldapply")}</h3>
          <p>
            Quisque et bibendum urna, eget consequat sapien. Integer sed
            condimentum nibh. Integer id neque tristique, lobortis massa ac,
            dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a
            velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla
            tortor orci, luctus a pretium vel, ultrices porta nisl.
          </p>

          <h3>{t("applyjob.whatnext")}</h3>
          <p>
            Quisque et bibendum urna, eget consequat sapien. Integer sed
            condimentum nibh. Integer id neque tristique, lobortis massa ac,
            dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a
            velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla
            tortor orci, luctus a pretium vel, ultrices porta nisl.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="application-form" ref={formRef}>
        <h3>{t("applyjob.submitapplication")}</h3>
        <form>
          <input type="text" placeholder={t("applyjob.fullname")} />
          <input type="email" placeholder={t("applyjob.email")} />
          <input type="tel" placeholder={t('applyjob.phone')} />
          <div className="select-container">
            <select className="form-control">
              <option value="" hidden>
              {t('applyjob.gender')}
              </option>
              <option>{t('applyjob.male')}</option>
              <option>{t('applyjob.female')}</option>
            </select>
            <IoMdArrowDropdown size={20} className="icon" />
          </div>
          <div className="file-upload">
            <label>{t('applyjob.cv')}</label>
            <input type="file" id="resume" />
            <label htmlFor="resume" className="custom-file-upload">
              <FaCloudUploadAlt size={30} className="upload-icon" /> 
              {t('applyjob.attach')}
            </label>
          </div>

          <h3>Links</h3>
          <input type="text" placeholder={t('applyjob.linkedln')} />
          <input type="text" placeholder={t('applyjob.twitter')} />
          <input type="text" placeholder={t('applyjob.portfolio')} />
          <input type="text" placeholder={t('applyjob.other')} />

          <h3>{t('applyjob.additional')}</h3>
          <textarea
            rows={6}
            placeholder={t('applyjob.add')}
          ></textarea>
          <button className="submit-button" type="submit">
          {t('applyjob.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
