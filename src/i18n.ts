import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'es'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  let activeLocale = locale;
  if (!activeLocale || !locales.includes(activeLocale as string)) {
    activeLocale = defaultLocale;
  }

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default
  };
});
