import { SupportedThemeType } from "@common/theme";

import { presetGpnDefault, presetGpnDark } from "nx-design/Theme";

import { presetGpnGreen } from "./presetGpnGreen";
import { creditConveyorThemeDefault } from "./presetGpnLight";

export const getUiKitTheme = (currentTheme: SupportedThemeType) => {
  switch (currentTheme) {
    case SupportedThemeType.LIGHT:
      return creditConveyorThemeDefault;
    case SupportedThemeType.DARK:
      return presetGpnDark;
    case SupportedThemeType.GREEN:
      return presetGpnGreen;
    default:
      return presetGpnDefault;
  }
};
