import { LOG_LEVELS, LogLevelsType, LogValueType, LoggerProviderType, LoggerServiceType } from "./types";

const _LEVEL = process.env.LOG_LEVEL;

const LEVEL = _LEVEL ? Number.parseInt(_LEVEL) || 0 : 0;

const isEnabled = (level: LogLevelsType) => LOG_LEVELS.indexOf(level) > LEVEL;

export const _LoggerService = (provider: LoggerProviderType): LoggerServiceType => {
  const debug = (value: LogValueType) => {
    if (isEnabled("debug")) {
      provider.debug(value);
    }
  };

  const info = (value: LogValueType) => {
    if (isEnabled("info")) {
      provider.info("Info", value);
    }
  };

  const warn = (value: LogValueType) => {
    if (isEnabled("warn")) {
      provider.warn("Warning\n", value);
    }
  };

  const error = (value: LogValueType) => {
    if (isEnabled("error")) {
      provider.error("Error", value);
    }
  };

  return {
    info,
    error,
    warn,
    debug,
  };
};
