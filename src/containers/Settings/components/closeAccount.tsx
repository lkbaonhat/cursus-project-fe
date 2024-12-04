import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/organisms/TextField/Input';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Warning = styled.p`
  color: #f44336; 
  margin-bottom: 20px;
`;

const Confirmation = styled.p`
  margin-bottom: 20px;
  font-size: 13px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f44336; 
  color: white;
  cursor: pointer;
`;

const CloseAccount: React.FC = () => {
  const { t } = useTranslation('setting'); // Using "setting" namespace
  const [password, setPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCloseAccount = () => {
    console.log('Closing account with password:', password);
  };

  return (
    <Section>
      <SectionTitle>{t('setting.close_account')}</SectionTitle>
      <Warning>
        {t('setting.closing_account_warning')}
      </Warning>
      <Input
        placeholder={t('setting.enter_your_password')}
        value={password}
        onChange={handleChange}
      />
      <Confirmation>{t('setting.are_you_sure')}</Confirmation>
      <Button onClick={handleCloseAccount}>{t('setting.close_account')}</Button>
    </Section>
  );
};

export default CloseAccount;