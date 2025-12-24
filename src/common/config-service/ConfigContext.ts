import { createContext } from "react";

import { MergedAppConfigType } from "./types";

export interface ConfigContextType {
  appConfig: Partial<MergedAppConfigType> | null;
}

export const ConfigContext = createContext<ConfigContextType>({
  appConfig: null,
});
