import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import vi from './vi';

const resources = {
  en,
  vi,
};

const defaultNS = 'sidebar';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['sidebar', 'setting', 'footer', 'header', 
    'home', 'help', 'notfound', 'aboutUs', 'checkout', 'certificate',
    'contact', 'feedback', 'thankyou', 'result', 'shopcart', 'login',
  'report', 'commingsoon', 'careers', 'applyjob', 'press'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;