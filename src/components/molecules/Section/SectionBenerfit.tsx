import styled from "styled-components";
import { RiHistoryLine } from "react-icons/ri";
import { LuUserCheck2 } from "react-icons/lu";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuPresentation } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

export const SectionContainer = styled.div`
  background-color: #ffff;
  border-radius: 3px;
  padding: 20px;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
`;

export const SectionIcon = styled.div`
  width: 100%;
  .icon {
    font-size: 50px;
    margin-right: 0;
    color: #333;
    background: #ffecec;
    border-radius: 3px;
    padding: 10px 6px;
    display: inline-block;
  }
`;

export const SectionContent = styled.div`
  width: 100%;
  margin-top: 20px;
  h4 {
    font-size: 18px;
    margin-bottom: 9px;
    display: block;
    font-weight: 500;
    color: #333;
    text-align: center;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    line-height: 26px;
    color: #686f7a;
    text-align: center;
  }
`;

export default function SectionBenerfit() {
  const { t } = useTranslation('home'); // Using "home" namespace

  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-xl-6 col-lg-12 col-md-6">
          <SectionContainer>
            <SectionIcon>
              <RiHistoryLine className="icon" />
            </SectionIcon>
            <SectionContent>
              <h4>{t('home.go_at_your_own_pace')}</h4>
              <p>{t('home.enjoy_lifetime_access')}</p>
            </SectionContent>
          </SectionContainer>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-6">
          <SectionContainer>
            <SectionIcon>
              <LuUserCheck2 className="icon" />
            </SectionIcon>
            <SectionContent>
              <h4>{t('home.go_at_your_own_pace')}</h4>
              <p>{t('home.enjoy_lifetime_access')}</p>
            </SectionContent>
          </SectionContainer>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-6">
          <SectionContainer>
            <SectionIcon>
              <FaRegCirclePlay className="icon" />
            </SectionIcon>
            <SectionContent>
              <h4>{t('home.go_at_your_own_pace')}</h4>
              <p>{t('home.enjoy_lifetime_access')}</p>
            </SectionContent>
          </SectionContainer>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-6">
          <SectionContainer>
            <SectionIcon>
              <LuPresentation className="icon" />
            </SectionIcon>
            <SectionContent>
              <h4>{t('home.go_at_your_own_pace')}</h4>
              <p>{t('home.enjoy_lifetime_access')}</p>
            </SectionContent>
          </SectionContainer>
        </div>
      </div>
    </div>
  );
}