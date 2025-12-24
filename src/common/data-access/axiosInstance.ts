import { getAccessTokenFromSessionStorage } from "@common/helpers";

import axios, { AxiosError, CreateAxiosDefaults } from "axios";

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`request error: [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export const getAxiosInstance = (config?: CreateAxiosDefaults) => {
  const axiosInstance = axios.create({
    baseURL: window._REACT_APP.basePath,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization) {
        const accessToken = getAccessTokenFromSessionStorage();

        if (accessToken !== "") {
          config.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use((response) => response, onRequestError);

  return axiosInstance;
};
