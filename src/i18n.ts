import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'es'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  console.log("i18n.ts: Resolving request config for locale:", locale);
  
  let activeLocale = locale;
  if (!activeLocale || !locales.includes(activeLocale as any)) {
    console.log("i18n.ts: Locale is missing/invalid, falling back to default:", defaultLocale);
    activeLocale = defaultLocale;
  }

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default
  };
});
