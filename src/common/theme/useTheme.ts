import { useContext, useState } from "react";

import { ThemeContext } from "./ThemeContext";
import { getCurrentTheme } from "./helpers";
import { SupportedThemeType } from "./types";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  const { onChangeTheme } = useContext(ThemeContext);

  const handleSwitchTheme = (newTheme: SupportedThemeType) => {
    setCurrentTheme(newTheme);
    onChangeTheme(newTheme);
  };

  const isTheme = (theme: SupportedThemeType) => {
    return theme === currentTheme;
  };

  return { currentTheme, isTheme, handleSwitchTheme };
};
