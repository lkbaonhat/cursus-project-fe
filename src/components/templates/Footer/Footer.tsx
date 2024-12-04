import styled from "styled-components";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";
import {useTranslation} from 'react-i18next'
import { ROUTES } from "@/routes";

interface LanguageItemProps {
  active?: boolean; 
  selected?: boolean; 
}
export const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

export const FooterCol = styled.div`
  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 5px 0;

      a {
        color: #fff;
        text-decoration: none;
        font-size: 14px;
        transition: color 0.3s ease;

        &:hover {
          color: #d72127;
        }
      }
    }
  }
`;

export const FooterButton00 = styled.button`
  display: inline-block;
  width: 143px;
  background-color: #d72127;
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 30px;

  &:hover {
    background-color: #a72127;
  }
`;

export const FooterButton = styled.button`
  display: inline-block;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  margin-bottom: 30px;
  border: 1px solid white;
  width: 143px;
  position: relative;
`;

export const FooterGlobe = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("path/to/globe.svg");
  background-size: cover;
  margin-right: 5px;
`;

export const FooterButtonText = styled.span`
  display: inline-block;
  margin-right: 5px;
  font-size: 14px;
  border-radius: 1px solid var(--bs-white);
`;

export const FooterArrow = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-image: url("path/to/arrow.svg");
  background-size: cover;
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  border-top: 1px solid #454545;
  padding-top: 20px;
`;

export const FooterCopyright = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;

  .footer__play {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url("path/to/play.svg");
    background-size: cover;
    margin-right: 10px;
  }
`;

export const FooterSocial = styled.div`
  display: flex;
  align-items: center;

  a {
    display: inline-block;
    margin: 0 5px;
    color: #fff;
    font-size: 18px;
    transition: color 0.3s ease;

    &:hover {
      color: #d72127;
    }
  }
`;

export const LanguageList = styled.ul<LanguageItemProps>`
  position: absolute;
  top: -200%;
  left: -77px;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  padding: 0;
  display: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  width: 220px;

  &.open {
    display: block;
  }

  li {
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: inherit;
      text-decoration: none;
      font-size: 14px;
      font-weight: ${(props) => (props.active ? "bold" : "normal")};
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }

    .language-right {
      color: #999;
    }
  }
`;
const LanguageItem = styled.li<LanguageItemProps>`
  padding: 8px 12px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  display: flex;
  align-items: center;

  a {
    font-size: 14px;
    display: flex;
    width: 100%;
    color: #333;

    ${(props) =>
      props.selected &&
      `
        font-weight: bold; 
      `};
  }

  .language-right {
    color: #999;
    margin-left: auto;
  }
`;
const LanguageName = styled.span`
  color: #333;
`;

const Footer = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const { i18n, t } = useTranslation(['footer']);

  const [languages, setLanguages] = useState([
    { code: 'en', lname: 'English', rname: 'English', selected: false },
    { code: 'vi', lname: 'VietNam', rname: 'Việt Nam', selected: false },
  ]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguages = () => {
    setShowLanguages(!showLanguages);
  };

  const changeLanguage = (lng: string) => {
    setLanguages((prevLanguages) =>
      prevLanguages.map((language) =>
        language.code === lng
          ? { ...language, selected: true }
          : { ...language, selected: false }
      )
    );

    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  };

  return (
    <FooterContainer className="footer">
      <div className="container">
        <div className="row ">
          <div className="col-lg-3 col-md-6">
            <FooterCol>
              <ul>
                <li>
                  <Link to={`${ROUTES.ABOUT_US}`}>{t('footer.about')}</Link>
                </li>
                <li>
                  <Link to={`${ROUTES.BLOG_DETAIL}`}>{t('footer.blog')}</Link>
                </li>
                <li>
                  <Link to={`${ROUTES.CAREERS}`}>{t('footer.careers')}</Link>
                </li>
                <li>
                  <Link to={`${ROUTES.PRESS}`}>{t('footer.press')}</Link>
                </li>
              </ul>
            </FooterCol>
          </div>
          <div className="col-lg-3 col-md-6">
            <FooterCol>
              <ul>
                <li>
                  <Link to={`${ROUTES.HELP}`}>{t('footer.help')}</Link>
                </li>

                <li>
                  <Link to={`${ROUTES.CONTACT}`}>{t('footer.contactUs')}</Link>
                </li>
                <li>
                  <Link to={`${ROUTES.TERMSOFUSE}`}>{t('footer.terms')}</Link>
                </li>
              </ul>
            </FooterCol>
          </div>
          <div className="col-lg-3 col-md-6">
            
          </div>
          <div className="d-flex flex-column col-md-3">
          <FooterButton00
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
           }}
            >
            {t('footer.teachOnCursus')}
          </FooterButton00>
            <FooterButton onClick={toggleLanguages}>
              <FooterGlobe>
                <AiOutlineGlobal />
              </FooterGlobe>
              <FooterButtonText>{t('footer.language')}</FooterButtonText>
              <FooterArrow>
                <IoIosArrowDown />
              </FooterArrow>
              <LanguageList
                className={
                  showLanguages ? 'language-list open' : 'language-list'
                }
              >
                {languages.map((language) => (
                  <LanguageItem
                    key={language.code}
                    selected={language.selected}
                  >
                    <Link
                      to="#"
                      onClick={() => changeLanguage(language.code)}
                    >
                      <LanguageName
                        style={{
                          fontWeight: language.selected ? 'bold' : 'normal',
                        }}
                      >
                        {language.lname}
                      </LanguageName>
                      <span className="language-right">
                        {language.rname}
                      </span>
                    </Link>
                  </LanguageItem>
                ))}
              </LanguageList>
            </FooterButton>
          </div>
        </div>

        <FooterBottom>
          <FooterCopyright>
            <span className="footer__play" />
            <img
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo1.svg"
              alt=""
              style={{ height: '27px', width: '45px' }}
            />
            {t('footer.2024cursus')}
          </FooterCopyright>
          <FooterSocial>
            <Link to="#">
              <i className="fab fa-facebook-f">
                <FaFacebookF />
              </i>
            </Link>
            <Link to="#">
              <i className="fab fa-twitter">
                <FaTwitter />
              </i>
            </Link>
            <Link to="#">
              <i className="fab fa-google-plus-g">
                <FaGooglePlusG />
              </i>
            </Link>
            <Link to="#">
              <i className="fab fa-linkedin-in">
                <FaLinkedinIn />
              </i>
            </Link>
            <Link to="#">
              <i className="fab fa-instagram">
                <FaInstagram />
              </i>
            </Link>
            <Link to="#">
              <i className="fab fa-youtube">
                <FaYoutube />
              </i>
            </Link>
            <Link to="#">
              <i className="fab fa-pinterest-p">
                <FaPinterestP />
              </i>
            </Link>
          </FooterSocial>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;
