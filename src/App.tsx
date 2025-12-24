import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@common/auth";
import { ConfigWrapper, ConfigContext } from "@common/config-service";
import { IntlWrapper } from "@common/localization";
import { LoggerService } from "@common/logger";
import { NotificationProvider } from "@common/notifications";
import { ThemeWrapper } from "@common/theme";
import { FallbackError, ThemeProviders } from "@shared";

import { AppContent } from "./AppContent";

export const App = () => {
  const onError = (error: Error) => LoggerService.error({ issuer: "host", status: "100", payload: error });

  return (
    <ConfigWrapper>
      <ConfigContext.Consumer>
        {({ appConfig }) => (
          <IntlWrapper appConfig={appConfig}>
            <ThemeWrapper Providers={ThemeProviders}>
              <ErrorBoundary FallbackComponent={FallbackError} onError={onError}>
                <AuthProvider appConfig={appConfig}>
                  <NotificationProvider>
                    <BrowserRouter>
                      <AppContent />
                    </BrowserRouter>
                  </NotificationProvider>
                </AuthProvider>
              </ErrorBoundary>
            </ThemeWrapper>
          </IntlWrapper>
        )}
      </ConfigContext.Consumer>
    </ConfigWrapper>
  );
};
