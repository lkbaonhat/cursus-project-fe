import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PrivacyItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  gap: 5px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-right: 10px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 30px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }

  ${ToggleInput}:checked + & {
    background-color: #ed2a26;
  }

  ${ToggleInput}:checked + &:before {
    transform: translateX(20px);
  }
`;

const ToggleLabel = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ed2a26;
  color: white;
  cursor: pointer;
  width: 150px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: black;
  }
`;

const Privacy: React.FC = () => {
  const { t } = useTranslation('setting'); // Using "setting" namespace

  const [privacySettings, setPrivacySettings] = useState({
    showProfileOnSearchEngines: true,
    showCoursesOnProfile: false,
  });

  const handleToggleChange = (setting: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting],
    });
  };

  return (
    <Section>
      <SectionTitle>{t('setting.privacy')}</SectionTitle>
      <p>{t('setting.modify_your_privacy')}</p>
      <SectionTitle>{t('setting.profile_page_settings')}</SectionTitle>
      <PrivacyItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={privacySettings.showProfileOnSearchEngines}
            onChange={() => handleToggleChange('showProfileOnSearchEngines')}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <ToggleLabel>{t('setting.show_your_profile')}</ToggleLabel>
      </PrivacyItem>
      <PrivacyItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={privacySettings.showCoursesOnProfile}
            onChange={() => handleToggleChange('showCoursesOnProfile')}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <ToggleLabel>{t('setting.show_courses_youre_taking')}</ToggleLabel>
      </PrivacyItem>
      <Button>{t('setting.save_changes')}</Button>
    </Section>
  );
};

export default Privacy;