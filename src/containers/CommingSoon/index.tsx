import { Link } from 'react-router-dom';
import './index.scss';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/routes';

const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  color: #fff;
  flex-direction: column;
`;

const CountdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const CountdownSection = styled.div`
  margin: 0 16px;
  text-align: center;
`;

const CountdownTimer = styled.div`
  font-size: 120px;
  font-weight: bold;
  line-height: 1;
  @media screen and (max-width: 1024px) {
    font-size: 100px;
  }
  @media screen and (max-width: 768px) {
    font-size: 80px;
  }
`;

const CountdownLabel = styled.div`
  font-size: 20px;
  margin-top: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

const EmailInput = styled.input`
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 4px;
  margin-right: 16px;
  width: 250px;
`;

const NotifyButton = styled.button`
  padding: 12px 24px;
  background-color: #f00;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
`;

const Divider = styled.hr`
  width: 75%;
  border: 1px solid #fff;
  margin-top: 32px;
  margin-bottom: 16px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled(Link)`
  color: #fff;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }
`;


const CommingSoon = () => {
  const { t } = useTranslation('commingsoon');

  const [countdownTime, setCountdownTime] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const targetDate = new Date('2024-12-30T12:00:00'); // Ngày đích
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      return difference > 0 ? difference : 0;
    };

    setCountdownTime(calculateTimeLeft());

    const intervalId = setInterval(() => {
      setCountdownTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const days = Math.floor(countdownTime / (24 * 60 * 60 * 1000));
  const hours = Math.floor((countdownTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((countdownTime % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((countdownTime % (60 * 1000)) / 1000);

  return (
    <div className="coming-soon">
      <Link to="/" className="logo">
        <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/ct_logo.svg" alt="Logo" />
      </Link>
      <CountdownContainer>
        <CountdownRow>
          <CountdownSection>
            <CountdownTimer>{String(days).padStart(2, '0')}:</CountdownTimer>
            <CountdownLabel>{t('commingsoon.days')}</CountdownLabel>
          </CountdownSection>
          <CountdownSection>
            <CountdownTimer>{String(hours).padStart(2, '0')}:</CountdownTimer>
            <CountdownLabel>{t('commingsoon.hours')}</CountdownLabel>
          </CountdownSection>
          <CountdownSection>
            <CountdownTimer>{String(minutes).padStart(2, '0')}:</CountdownTimer>
            <CountdownLabel>{t('commingsoon.minutes')}</CountdownLabel>
          </CountdownSection>
          <CountdownSection>
            <CountdownTimer>{String(seconds).padStart(2, '0')}</CountdownTimer>
            <CountdownLabel>{t('commingsoon.seconds')}</CountdownLabel>
          </CountdownSection>
        </CountdownRow>
        <div>{t('commingsoon.coming_soon')}</div>
        <InputContainer>
          <Link to={`${ROUTES.HOME}`} className='back-to-home-commingsoon'>{t('commingsoon.backhome')}</Link>
        </InputContainer>
      </CountdownContainer>
      <Divider />
      <Footer>

        <div>{t('commingsoon.copyright')}</div>
      </Footer>
    </div>
  );
};

export default CommingSoon;
