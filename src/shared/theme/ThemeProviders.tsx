import React, { useMemo } from "react";

import { getCurrentTheme } from "@common/theme";
import { getUiKitTheme, Theme } from "@common/ui-kit";

import { ThemeProvider } from "styled-components";

import { getAppTheme } from "./appTheme";

export const ThemeProviders = ({ children }: React.PropsWithChildren) => {
  const theme = getCurrentTheme();

  const appTheme = useMemo(() => getAppTheme(theme), [theme]);

  const uiKitTheme = useMemo(() => getUiKitTheme(theme), [theme]);

  return (
    <ThemeProvider theme={appTheme}>
      <Theme preset={uiKitTheme}>{children}</Theme>
    </ThemeProvider>
  );
};
