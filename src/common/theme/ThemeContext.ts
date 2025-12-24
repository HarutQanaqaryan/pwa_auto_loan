import { createContext } from "react";

import { changeTheme } from "./helpers";
import { SupportedThemeType } from "./types";

interface ThemeContextProps {
  theme: SupportedThemeType;
  onChangeTheme: (theme: SupportedThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: SupportedThemeType.GREEN,
  onChangeTheme: (theme: SupportedThemeType) => changeTheme(theme),
});
