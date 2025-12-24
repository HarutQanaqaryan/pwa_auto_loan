import React, { useContext, useMemo, useEffect, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useAuthContext } from "@common/auth";
import { DynamicModule, PrivateRoute } from "@common/components";
import { ConfigContext } from "@common/config-service";
import { EventBusService, NotificationPayloadType } from "@common/event-bus-service";
import { useTranslate } from "@common/hooks";
import { IntlContext } from "@common/localization";
import { useNotification } from "@common/notifications";
import { Notification } from "@common/ui-kit";
import { HomePage, LoanApplicationPage, MainProvider } from "@loan-apps";
import { NotFoundPage, PageWrapper } from "@shared";

import { Button } from "antd";

export const AppContent = () => {
  const { items, onChangeItems } = useNotification();
  const { isAuthenticated, isInitialized } = useAuthContext();
  const { loadModuleMessages } = useContext(IntlContext);
  const navigate = useNavigate();

  const { translate } = useTranslate();

  const showError = useCallback(
    (error: unknown) => {
      const _error = error as Error;
      onChangeItems({ name: _error.name, message: _error.message, type: "error" });
    },
    [onChangeItems],
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, onError: showError },
        },
      }),
    [showError],
  );

  const { appConfig } = useContext(ConfigContext);

  const modulesWithRoutes = useMemo(() => appConfig?.modules?.filter((m) => !!m.path), [appConfig?.modules]);

  const handleNotificationEvent = useCallback(
    (payload: NotificationPayloadType) => {
      onChangeItems({ ...payload });
    },
    [onChangeItems],
  );

  useEffect(() => {
    EventBusService.subscribe("NOTIFICATION", handleNotificationEvent);
  }, [handleNotificationEvent]);

  return (
    <MainProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/loan-apps"
            element={
              <PrivateRoute isInitialized={isInitialized} isAuthenticated={isAuthenticated}>
                <PageWrapper title={translate("loanApps.loansList.title")}>{<HomePage />}</PageWrapper>
              </PrivateRoute>
            }
          />

          <Route
            path="/loan-apps/*"
            element={
              <PrivateRoute isInitialized={isInitialized} isAuthenticated={isAuthenticated}>
                <PageWrapper title={translate("loanApps.loansList.title")}>
                  <LoanApplicationPage />
                </PageWrapper>
              </PrivateRoute>
            }
          />

          {modulesWithRoutes?.map((module) => (
            <Route
              key={module.path}
              path={module.path}
              element={
                <PageWrapper title={module.module}>
                  <DynamicModule module={module} init={{ loadModuleMessages: loadModuleMessages }} />
                </PageWrapper>
              }
            />
          ))}

          <Route
            path="*"
            element={
              <NotFoundPage
                title={translate("common.messages.pageNotFound")}
                actions={<Button onClick={() => navigate("/loan-apps")}>{translate("common.backButton.title")}</Button>}
              />
            }
          />
          <Route path="/" element=<Navigate to={"/loan-apps"} /> />
        </Routes>

        <Notification items={items} />
      </QueryClientProvider>
    </MainProvider>
  );
};
