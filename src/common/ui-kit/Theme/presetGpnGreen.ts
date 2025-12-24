// import "../Theme.css";
// import "../_color/Theme_color_gpnDefault.css";
// import "../_color/Theme_color_gpnDark.css";
// import "../_control/Theme_control_gpnDefault.css";
// import "../_font/Theme_font_gpnDefault.css";
// import "../_size/Theme_size_gpnDefault.css";
// import "../_space/Theme_space_gpnDefault.css";
// import "../_shadow/Theme_shadow_gpnDefault.css";
import "./_color/Theme_color_greenTheme.css";
import "./preset.css";
import { ThemePreset } from "@common/ui-kit";

export const presetGpnGreen: ThemePreset = {
  color: {
    primary: "gpnGreen",
    accent: "gpnGreen",
    invert: "gpnGreen",
  },
  control: "gpnDefault",
  font: "gpnDefault",
  size: "gpnDefault",
  space: "gpnDefault",
  shadow: "gpnDefault",
};
