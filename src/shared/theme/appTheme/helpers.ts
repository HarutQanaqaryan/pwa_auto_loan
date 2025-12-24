import { SupportedThemeType } from "@common/theme";

import { darkTheme, greenTheme, lightTheme } from "./themes";
import { AppThemeType } from "./types";

export const getAppTheme = (currentTheme: SupportedThemeType): AppThemeType => {
  switch (currentTheme) {
    case SupportedThemeType.LIGHT:
      return lightTheme;

    case SupportedThemeType.DARK:
      return darkTheme;

    case SupportedThemeType.GREEN:
      return greenTheme;

    default:
      return greenTheme;
  }
};
