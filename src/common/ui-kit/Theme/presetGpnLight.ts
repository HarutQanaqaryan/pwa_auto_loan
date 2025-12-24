import { ThemePreset } from "@common/ui-kit";

import { presetGpnDefault } from "nx-design/Theme";

import "./_color/Theme_color_lightTheme.css";
import "./_font/Theme_font_lightTheme.css";
import "./_size/Theme_size_lightTheme.css";
import "./preset.css";

export const creditConveyorThemeDefault: ThemePreset = {
  ...presetGpnDefault,
  font: "lightTheme",
  size: "lightTheme",
  color: {
    ...presetGpnDefault.color,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lightTheme: "lightTheme",
  },
};
