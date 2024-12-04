import React from "react";
import styled from "styled-components";
import { CiCircleAlert } from "react-icons/ci";
import { useTranslation } from 'react-i18next'; 

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #efefef;
  background-color: white;
  color: #686f7a;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: #efefef;
    background-color: black;
  }
`;

const InfoIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  color: #ed2a26;
  text-align: center;
  line-height: 16px;
  font-size: 20px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoText = styled.p`
  margin-left: 10px;
`;

const APIClients: React.FC = () => {
  const { t } = useTranslation('setting'); 

  return (
    <Section>
      <SectionTitle>{t('setting.affiliate_api')}</SectionTitle>
      <Description>
        {t('setting.affiliate_api_description')}
      </Description>
      <Description>
        {t('setting.to_see_more_details')} 
        <a href="#">{t('setting.cursus_affiliate_api')}</a>
      </Description>
      <Button>{t('setting.request_affiliate_api_client')}</Button>
      <InfoContainer>
        <InfoIcon>
          <CiCircleAlert />
        </InfoIcon>
        <InfoText>{t('setting.you_dont_have_any_api')}</InfoText>
      </InfoContainer>
    </Section>
  );
};

export default APIClients;