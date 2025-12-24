import React, { useCallback, useMemo, useState } from "react";

import { ThemeContext } from "./ThemeContext";
import { changeTheme, getCurrentTheme } from "./helpers";
import { SupportedThemeType } from "./types";

interface ThemeWrapperProps extends React.PropsWithChildren {
  Providers: ({ children }: React.PropsWithChildren) => JSX.Element;
}

export const ThemeWrapper = ({ Providers, children }: ThemeWrapperProps) => {
  const [theme, setTheme] = useState(() => getCurrentTheme());

  const handleChangeTheme = useCallback((newTheme: SupportedThemeType) => {
    setTheme(newTheme);
    changeTheme(newTheme);
  }, []);

  const themeContextValue = useMemo(
    () => ({ theme: theme, onChangeTheme: handleChangeTheme }),
    [theme, handleChangeTheme],
  );

  return (
    <Providers>
      <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
    </Providers>
  );
};
