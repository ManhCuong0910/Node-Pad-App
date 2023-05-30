import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import React from 'react'
i18n.use(initReactI18next).init({
    resources: {
      vn: {
        translation: {
          "Welcome to React": "Chào mừng đến với React",
        },
      },
      en: {
        translation: {
          "Chào mừng đến với React": "Welcome to React ",
        },
      },
    },
    lng:'en',
  });
export default function Translate() {
    
    const {t} = useTranslation()
  return (
    <div>
    <h1>{t('Chào mừng đến với React')}</h1>
    </div>
  )
}
