import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from './resources';
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    fallbackLng: "en",
    supportedLngs: ['ru', 'en'],
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
