import { useState } from "react";

import { httpClient } from "@common/data-access";

import { ConfigStatusType, DynamicAppConfigType, ConfigurationDataResponse } from "../types";

const mapResponse = (data: ConfigurationDataResponse) => {
  return (
    data.data?.map((item) => ({
      module: item.module || "",
      scope: item.scope || "",
      path: item.path,
      filename: item.filename || "",
    })) || []
  );
};

export const useDynamicConfig = () => {
  const [configStatus, setConfigStatus] = useState<ConfigStatusType>(ConfigStatusType.IS_INITIAL);
  const [dynamicConfig, setDynamicConfig] = useState<DynamicAppConfigType | null>(null);

  const isLoaded = configStatus === ConfigStatusType.IS_LOADED;
  const isError = configStatus === ConfigStatusType.IS_ERROR;

  const TOKEN = "";

  const fetchConfig = async (url: string) => {
    try {
      const { data } = await httpClient.request<ConfigurationDataResponse>({
        method: "GET",
        url,
        params: {
          channel: "DEFAULT",
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setDynamicConfig({
        modules: mapResponse(data),
      });
      setConfigStatus(ConfigStatusType.IS_LOADED);
    } catch {
      setDynamicConfig(null);
      setConfigStatus(ConfigStatusType.IS_ERROR);
    }
  };

  return {
    dynamicConfig,
    isLoaded,
    isError,
    fetchConfig,
  };
};
