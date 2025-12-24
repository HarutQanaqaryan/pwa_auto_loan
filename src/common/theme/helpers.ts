import { SupportedThemeType } from "./types";

export const getCurrentTheme = () => {
  const theme = localStorage.getItem("theme");
  if (isThemeType(theme)) {
    return theme;
  } else {
    return SupportedThemeType.GREEN;
  }
};

export const isThemeType = (theme: string | null): theme is SupportedThemeType => {
  return !!theme && Object.values(SupportedThemeType).includes(theme as SupportedThemeType);
};

export const changeTheme = (theme: SupportedThemeType) => {
  localStorage.setItem("theme", theme);
};
