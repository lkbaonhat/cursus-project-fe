import React, { useState, useEffect } from 'react';
import Account from './components/accounts';
import Notifications from './components/notification';
import Privacy from './components/privacy';
import BillingAndPayouts from './components/changePassword';
import APIClients from './components/apiClients';
import CloseAccount from './components/closeAccount';
import './index.scss';
import { useTranslation } from 'react-i18next';
import ChangePassword from './components/changePassword';

interface TabContent {
  key: string;
  content: React.ReactNode;
}

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation('setting');

  const [activeTabKey, setActiveTabKey] = useState<string>('account');

  const tabs: TabContent[] = [
    { key: 'account', content: <Account /> },
    { key: 'change_password', content: <ChangePassword /> },
    { key: 'notifications1', content: <Notifications /> },
    // { key: 'privacy', content: <Privacy /> },
    // { key: 'api_clients', content: <APIClients /> },
    // { key: 'close_account', content: <CloseAccount /> },
  ];

  useEffect(() => {
    setActiveTabKey('account');
  }, [i18n.language]);

  return (
    <div className="tab-container">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTabKey === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTabKey(tab.key)}
          >
            {t(`setting.${tab.key}`)} {/* Translate using key */}
          </button>
        ))}
      </div>
      {tabs.find((tab) => tab.key === activeTabKey)?.content}
    </div>
  );
};

export default SettingsPage;
