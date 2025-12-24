import * as dateFnsLocales from "date-fns/locale";

type DateFnsLocalesType = typeof dateFnsLocales;

export const getCurrentLocale = () => {
  return localStorage.getItem("language") || "en-us";
};

export const changeLocale = (locale: string) => {
  localStorage.setItem("language", locale);
  location.reload();
};

const DateLocalesKeys = Object.keys(dateFnsLocales);

const isDateFnsLocale = (locale: string): locale is keyof DateFnsLocalesType => {
  return DateLocalesKeys.includes(locale);
};

export const getDateLocale = (locale: string) => {
  if (isDateFnsLocale(locale)) {
    return dateFnsLocales[locale];
  }
  return dateFnsLocales["enUS"];
};

export const getCurrentDateLocale = () => {
  const locale = getCurrentLocale();

  const splitted = locale.split("-");
  const formatted = splitted.length > 1 ? splitted[0] + splitted[1].toUpperCase() : locale;

  return getDateLocale(formatted);
};
