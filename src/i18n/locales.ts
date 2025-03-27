const defaultLocaleConfig = {
  code: 'en',
  localName: 'English',
  name: 'English',
  langDir: 'ltr',
  dateFormat: 'MM.DD.YYYY',
  hrefLang: 'en-GB',
  enabled: true,
  default: true,
};

const locales = [
  defaultLocaleConfig,
  {
    code: 'de',
    localName: 'Deutsch',
    name: 'German',
    langDir: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    hrefLang: 'de',
    enabled: false,
    default: false,
  },
  {
    code: 'es',
    localName: 'Español',
    name: 'Spanish',
    langDir: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    hrefLang: 'es-ES',
    enabled: false,
    default: false,
  },
  {
    code: 'fr',
    localName: 'Français',
    name: 'French',
    langDir: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    hrefLang: 'fr',
    enabled: true,
    default: false,
  },
];

// As set of available and enabled locales for the website
// This is used for allowing us to redirect the user to any
// of the available locales that we have enabled on the website
const availableLocales = locales.filter(locale => locale.enabled);

// This gives an easy way of accessing all available locale codes
const availableLocaleCodes = availableLocales.map(locale => locale.code);

// This provides the default locale information for the Next.js Application
// This is marked by the unique `locale.default` property on the `en` locale
const defaultLocale = availableLocales.find(locale => locale.default) || defaultLocaleConfig;

// Creates a Map of available locales for easy access
const availableLocalesMap = Object.fromEntries(locales.map(locale => [locale.code, locale]));

// Creates all supported locales
const allLocaleCodes = locales.map(locale => locale.code);

const localePrefix = 'as-needed';

export {
  allLocaleCodes,
  availableLocaleCodes,
  availableLocales,
  availableLocalesMap,
  defaultLocale,
  localePrefix,
};
