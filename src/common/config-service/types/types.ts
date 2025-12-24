import { ModuleType } from "../../types";

export type ConfigModeType = "static" | "dynamic";

export interface AppConfigType {
  configMode: ConfigModeType;
  configUrl: string;
  basePath: string;
  modules?: ModuleType[];
  clientId: string;
  authProviderUrl: string;
  logo?: string;
  locale?: string;
  availableLocales?: string[];
}

export interface DynamicAppConfigType {
  modules?: ModuleType[];
}

export interface MergedAppConfigType extends AppConfigType, DynamicAppConfigType {}

export enum ConfigStatusType {
  IS_INITIAL = "IS_INITIAL",
  IS_LOADING = "IS_LOADING",
  IS_LOADED = "IS_LOADED",
  IS_ERROR = "IS_ERROR",
}
