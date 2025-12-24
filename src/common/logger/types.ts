/* eslint-disable @typescript-eslint/no-explicit-any */

export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

export type LogLevelsType = (typeof LOG_LEVELS)[number];

export interface LogValueType {
  issuer: string;
  status?: string;
  payload?: any;
  timestamp?: any;
}

export type LoggerProviderType = {
  [key in LogLevelsType]: (message?: any, ...params: any[]) => void;
};

export type LoggerServiceType = {
  [key in LogLevelsType]: (value: LogValueType) => void;
};
