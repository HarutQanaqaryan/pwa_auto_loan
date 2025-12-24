import { createContext } from "react";

import { changeLocale } from "@common/helpers";

interface IntlContextType {
  locale: string;
  availableLocales: string[];
  onChangeLocale: (locale: string) => void;
  loadModuleMessages?: (path: string) => Promise<boolean>;
}

export const IntlContext = createContext<IntlContextType>({
  locale: "en-us",
  availableLocales: ["en-us"],
  onChangeLocale: (locale: string) => changeLocale(locale),
});
