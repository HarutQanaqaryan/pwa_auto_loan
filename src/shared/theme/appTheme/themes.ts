import { BorderRadius, DarkBorders, GreenBorders, Fonts, LightBorders, Shadows, Space } from "./defaultSettings";
import { AppThemeType } from "./types";

export const lightTheme: AppThemeType = {
  colors: {
    primary: "rgb(23, 29, 69)",
    secondary: "rgba(255, 255, 255, 0.6)",
    accent: "rgb(255, 255, 255)",
    bgPrimary: "rgb(76, 62, 105)",
    bgSecondary: "rgba(255, 255, 255, 0.9)",
    bgDefault: "rgba(37, 47, 95, 0.07)",
    bgDefaultHover: "rgba(250, 250, 250, 0.23)",
    success: "rgb(32, 84, 85)",
    error: "rgb(215, 25, 25)",
    warning: "rgb(216, 120, 24)",
    active: "rgb(216, 120, 24)",
  },
  spaces: Space,
  borders: LightBorders,
  borderRadius: BorderRadius,
  fonts: Fonts,
  shadows: Shadows,
};

export const darkTheme: AppThemeType = {
  colors: {
    primary: "rgb(255, 255, 255)",
    secondary: "rgba(255, 255, 255, 0.6)",
    accent: "rgb(250, 250, 250)",
    bgPrimary: "rgba(51, 51, 51, 1)",
    bgSecondary: "rgba(250, 250, 250, 0.16)",
    bgDefault: "rgb(22, 26, 29)",
    bgDefaultHover: "rgba(250, 250, 250, 0.23)",
    success: "rgb(30, 72, 32)",
    error: "rgb(184, 10, 10)",
    warning: "rgb(248, 199, 53)",
    active: "rgb(216, 120, 24)",
  },
  spaces: Space,
  borders: DarkBorders,
  borderRadius: BorderRadius,
  fonts: Fonts,
  shadows: Shadows,
};

export const greenTheme: AppThemeType = {
  colors: {
    primary: "rgb(44, 44, 44)",
    secondary: "rgba(13, 16, 8, 0.6)",
    accent: "rgb(250, 250, 250)",
    bgPrimary: "rgb(44, 44, 44)",
    bgSecondary: "rgb(255, 255, 255)",
    bgDefault: "rgb(242, 243, 238)",
    bgDefaultHover: "rgb(159, 199, 44)",
    success: "rgb(9, 135, 74)",
    error: "rgb(135, 9, 68)",
    warning: "rgb(157, 95, 38)",
    active: "rgb(82, 108, 13)",
  },
  spaces: Space,
  borders: GreenBorders,
  borderRadius: BorderRadius,
  fonts: Fonts,
  shadows: Shadows,
};
