import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Hãy nhập nội dung bạn cần tìm": "Please enter what you are looking for",
      "Thêm công việc": "ADD TASK",
      "DANH SÁCH CÔNG VIỆC CỦA TÔI": "MY TODO",
      "Hãy nhập công việc của bạn": "PLease enter your work"
    }
  },
  vi: {
    translation: {
      "Please enter what you are looking for": "Hãy nhập nội dung bạn cần tìm",
      "ADD TASK": "Thêm công việc",
      "MY TODO": "DANH SÁCH CÔNG VIỆC CỦA TÔI",
      "PLease enter your work": "Hãy nhập công việc của bạn"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',  // Ngôn ngữ mặc định sẽ hiển thị
  interpolation: {
    escapeValue: false
  }
});

export default i18n;