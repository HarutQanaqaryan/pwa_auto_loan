import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";

import { changeLocale, getCurrentLocale } from "@common/helpers";

import { IntlContext } from "./IntlContext";
import { useLoadMessages } from "./useLoadMessages";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import enUS from "antd/locale/en_US";

interface IntlWrapperProps extends React.PropsWithChildren {
  moduleName?: string;
  appConfig: {
    availableLocales?: string[];
    locale?: string;
  } | null;
}

export const IntlWrapper = ({ moduleName, children, appConfig }: IntlWrapperProps) => {
  const [locale, setLocale] = useState(() => getCurrentLocale());

  const { messages, getMessages } = useLoadMessages({ availableLocales: appConfig?.availableLocales || [] });

  const handleChangeLocale = useCallback((newLocale: string) => {
    setLocale(newLocale);
    changeLocale(newLocale);
  }, []);

  const loadModuleMessages = useCallback(
    async (path: string) => {
      return getMessages(path)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    [getMessages],
  );

  const IntlContextValue = useMemo(
    () => ({
      locale: locale,
      availableLocales: appConfig?.availableLocales || [],
      onChangeLocale: handleChangeLocale,
      loadModuleMessages: loadModuleMessages,
    }),
    [locale, appConfig, handleChangeLocale, loadModuleMessages],
  );

  useEffect(() => {
    const availableLocales = appConfig?.availableLocales;

    if (availableLocales) {
      const rootPath = `${__webpack_public_path__}locales`;
      const path = moduleName ? rootPath + `/${moduleName}` : rootPath;

      getMessages(path);
    }
  }, [appConfig, getMessages, moduleName]);

  return (
    <IntlContext.Provider value={IntlContextValue}>
      {!!messages && (
        <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={appConfig?.locale || "en-us"}>
          <ConfigProvider locale={locale === "ru" ? ruRU : enUS}>{children}</ConfigProvider>
        </IntlProvider>
      )}
    </IntlContext.Provider>
  );
};
