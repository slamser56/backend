import i18n from 'i18n-js';
import en from './en.json';
import ru from './ru.json';

i18n.translations.en = en;
i18n.translations.ru = ru;

export const changeLanguage = (language: string):void => {
    i18n.locale = language;
};

export const { t } = i18n;
