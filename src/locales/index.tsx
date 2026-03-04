import mm from './mm.json';
import en from './en.json';
import th from './th.json';
export {en, mm, th};
import i18next, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLanguage} from '@utils';
const resources = {
  en: {
    translation: en,
  },
  mm: {
    translation: mm,
  },
  th: {
    translation: th,
  },
};

const list_lang = Object.keys(resources);
const default_lang = list_lang[0];
export const languageInit: InitOptions = {
  resources,
  lng: getLanguage(),
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  react: {useSuspense: false},
};

i18next.use(initReactI18next).init(languageInit);
export {i18next, resources, list_lang, default_lang};
