import styled from 'styled-components';
import { PiMapPinLine, PiBaby } from "react-icons/pi";
import { LuPlane } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineCastConnected, MdAnchor, MdOutlineThumbsUpDown } from "react-icons/md";
import { IoFlowerOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 100px;
  color: #666;
  text-align: center;
`;

const BenefitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  max-width: 1000px;
  gap: 2rem;

  @media screen and (max-width: 992px) {
    justify-content: center;
    gap: 1rem;
  }
`;

const BenefitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-radius: 5px;
  text-align: center;
  width: 20%; 
  margin-bottom: 14%;
  @media screen and (max-width: 992px) {
    width: 45%; 
  }

  @media screen and (max-width: 768px) {
    width: 100%; 
  }
`;

const BenefitIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  margin-bottom: 20px;
`;

const BenefitTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const BenefitDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #666;
`;

const Benefits = () => {
  const { t } = useTranslation('careers');
  return (
    <Container>
      <Title>{t('careers.title')}</Title>
      <Subtitle>
        {t('careers.subtitle')}
      </Subtitle>
      <BenefitsContainer>
        <BenefitCard>
          <BenefitIcon>
            <PiMapPinLine />
          </BenefitIcon>
          <BenefitTitle>{t('careers.work_from_anywhere.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <LuPlane />
          </BenefitIcon>
          <BenefitTitle>{t('careers.work_and_travel.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaRegClock />
          </BenefitIcon>
          <BenefitTitle>{t('careers.flexible_hours.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <PiBaby />
          </BenefitIcon>
          <BenefitTitle>{t('careers.purchasing_leave.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <MdOutlineCastConnected />
          </BenefitIcon>
          <BenefitTitle>{t('careers.social_events.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <IoFlowerOutline />
          </BenefitIcon>
          <BenefitTitle>{t('careers.wellness_program.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <MdOutlineThumbsUpDown />
          </BenefitIcon>
          <BenefitTitle>{t('careers.mentoring_program.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <MdAnchor />
          </BenefitIcon>
          <BenefitTitle>{t('careers.fundraising.title')}</BenefitTitle>
          <BenefitDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan.
          </BenefitDescription>
        </BenefitCard>
      </BenefitsContainer>
    </Container>
  );
};

export default Benefits;