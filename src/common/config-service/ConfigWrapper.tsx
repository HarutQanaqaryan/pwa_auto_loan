import React, { useMemo } from "react";

import { ConfigContext } from "./ConfigContext";
import { useAppConfig } from "./hooks";

interface ConfigWrapperProps extends React.PropsWithChildren {}

export const ConfigWrapper = ({ children }: ConfigWrapperProps) => {
  const { appConfig } = useAppConfig();

  const ConfigContextValue = useMemo(
    () => ({
      appConfig: appConfig,
    }),
    [appConfig],
  );

  return <ConfigContext.Provider value={ConfigContextValue}>{children}</ConfigContext.Provider>;
};
