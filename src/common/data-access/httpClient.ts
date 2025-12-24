import { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";

import { getAxiosInstance } from "./axiosInstance";

class HttpClientClass {
  public readonly axiosInstance: AxiosInstance;

  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = getAxiosInstance({
      ...config,
    });
  }

  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.request(config);
  }
}

export const httpClient = new HttpClientClass();
