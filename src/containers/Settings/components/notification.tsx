import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NotificationItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
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
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }

  ${ToggleInput}:checked + & {
    background-color: #d72127;
  }

  ${ToggleInput}:checked + &:before {
    transform: translateX(20px);
  }
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`;

const RowTotle = styled.div`
  position: relative;
`;

const Description = styled.p`
  font-size: 12px;
  color: #666;
  margin-left: 50px;
  margin-top: 5px;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-top: 0;
  }
`;

const EmailNotifications = styled.div`
  margin-bottom: 10px;
`;

const EmailMessage = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const LearnMoreLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #727983;
    /* text-decoration: underline; */
  }
`;
const HorizontalRule = styled.hr`
  color: #9b9b9b;
  margin: 50px 0;
  width: 90%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ed2a26;
  color: white;
  cursor: pointer;
  width: 150px;
  &:hover {
    background-color: black;
  }
`;

const Notifications: React.FC = () => {
  const { t } = useTranslation('setting');

  const [notificationSettings, setNotificationSettings] = useState({
    subscriptions: true,
    recommendedCourses: false,
    activityOnComments: false,
    repliesToComments: true,
    emailAboutActivity: true,
    promotions: false,
    announcements: false,
  });

  React.useEffect(() => {
    const storedData = localStorage.getItem('notificationSettings');
    if (storedData) {
      setNotificationSettings(JSON.parse(storedData));
    }
  }, []);

  const handleToggleChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleSaveClick = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
  };

  return (
    <Section>
      <SectionTitle>
        {t('setting.notifications')}
      </SectionTitle>
      <p>{t('setting.select_push_and_email')}</p>

      <NotificationItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notificationSettings.subscriptions}
            onChange={() => handleToggleChange("subscriptions")}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <RowTotle>
          <ToggleLabel>{t('setting.subscriptions')}</ToggleLabel>
          <Description>
            {t('setting.notify_me_about')}
          </Description>
        </RowTotle>
      </NotificationItem>

      <NotificationItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notificationSettings.recommendedCourses}
            onChange={() => handleToggleChange("recommendedCourses")}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <RowTotle>
          <ToggleLabel>{t('setting.recommended_courses')}</ToggleLabel>
          <Description>
            {t('setting.notify_me_of_courses')}
          </Description>
        </RowTotle>
      </NotificationItem>

      <NotificationItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notificationSettings.activityOnComments}
            onChange={() => handleToggleChange("activityOnComments")}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <RowTotle>
          <ToggleLabel>{t('setting.activity_on_comments')}</ToggleLabel>
          <Description>
            {t('setting.notify_me_about_activity')}
          </Description>
        </RowTotle>
      </NotificationItem>

      <NotificationItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notificationSettings.repliesToComments}
            onChange={() => handleToggleChange("repliesToComments")}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <RowTotle>
          <ToggleLabel>{t('setting.replies_to_comments')}</ToggleLabel>
          <Description>{t('setting.notify_me_about_replies')}</Description>
        </RowTotle>
      </NotificationItem>
      <HorizontalRule />
      <SectionTitle>{t('setting.email_notifications')}</SectionTitle>
      <EmailNotifications>
        <EmailMessage>
          {t('setting.your_emails_are_sent_to')}
          <LearnMoreLink href="#">{t('setting.learn_more')}</LearnMoreLink>{' '}
          {t('setting.about_emails_from_edututs.')}
        </EmailMessage>
      </EmailNotifications>

      <NotificationItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notificationSettings.emailAboutActivity}
            onChange={() => handleToggleChange("emailAboutActivity")}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <RowTotle>
          <ToggleLabel>
            {t('setting.send_me_emails_about')}
          </ToggleLabel>
          <Description>
            {t('setting.if_this_setting_is_turned')}
          </Description>
        </RowTotle>
      </NotificationItem>

      <NotificationItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notificationSettings.promotions}
            onChange={() => handleToggleChange("promotions")}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <ToggleLabel>
          {t('setting.promotions_course_recommendations')}
        </ToggleLabel>
      </NotificationItem>

      <NotificationItem>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notificationSettings.announcements}
            onChange={() => handleToggleChange("announcements")}
          />
          <ToggleSlider />
        </ToggleSwitch>
        <RowTotle>
          <ToggleLabel>
            {t('setting.announcements_from_instructors')}
          </ToggleLabel>
          <Description>
            {t('setting.to_adjust_this_preference')}
          </Description>
        </RowTotle>
      </NotificationItem>
      <Button onClick={handleSaveClick}>{t('setting.save_changes')}</Button>
    </Section>
  );
};

export default Notifications;