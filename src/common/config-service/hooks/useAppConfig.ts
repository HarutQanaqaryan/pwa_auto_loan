import { useEffect, useState } from "react";

import { useDynamicConfig } from "./useDynamicConfig";
import { useStaticConfig } from "./useStaticConfig";
import { MergedAppConfigType } from "../types";

export const useAppConfig = () => {
  const [appConfig, setAppConfig] = useState<Partial<MergedAppConfigType> | null>(null);

  const { staticConfig, isLoaded: isStaticConfigLoaded, fetchConfig: fetchStaticConfig } = useStaticConfig();
  const {
    dynamicConfig,
    isLoaded: isDynamicConfigLoaded,
    isError: isDynamicConfigError,
    fetchConfig: fetchDynamicConfig,
  } = useDynamicConfig();

  const withDynamicConfig = staticConfig?.configMode === "dynamic";

  const configUrl = staticConfig?.configUrl;

  useEffect(() => {
    fetchStaticConfig();
  }, []);

  useEffect(() => {
    if (withDynamicConfig && configUrl) {
      fetchDynamicConfig(configUrl);
    }
  }, [withDynamicConfig, configUrl]);

  useEffect(() => {
    if (isStaticConfigLoaded && !withDynamicConfig) {
      setAppConfig(staticConfig);
    }
  }, [staticConfig, withDynamicConfig, isStaticConfigLoaded]);

  useEffect(() => {
    if (withDynamicConfig && isDynamicConfigLoaded) {
      setAppConfig({ ...staticConfig, ...dynamicConfig });
    }
  }, [staticConfig, dynamicConfig, withDynamicConfig, isDynamicConfigLoaded]);

  useEffect(() => {
    if (withDynamicConfig && isDynamicConfigError) {
      setAppConfig(staticConfig);
    }
  }, [staticConfig, withDynamicConfig, isDynamicConfigError]);

  return { appConfig };
};
