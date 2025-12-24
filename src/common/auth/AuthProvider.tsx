import React, { useEffect, useState } from "react";
import { AuthProviderProps as ProviderProps, AuthProvider as Provider } from "react-oidc-context";

import { getCurrentLocale } from "@common/helpers";
import { Loader } from "@common/ui-kit";

interface AuthProviderProps extends React.PropsWithChildren {
  appConfig: {
    authProviderUrl?: string;
    clientId?: string;
  } | null;
}

export const AuthProvider = ({ appConfig, children }: AuthProviderProps) => {
  const [providerConfig, setProviderConfig] = useState<ProviderProps | null>(null);

  const locale = getCurrentLocale();

  useEffect(() => {
    if (appConfig && appConfig.authProviderUrl && appConfig.clientId) {
      const config: ProviderProps = {
        authority: appConfig.authProviderUrl,
        client_id: appConfig.clientId,
        redirect_uri: location.origin,
        post_logout_redirect_uri: location.origin,
        ui_locales: locale.toLocaleLowerCase(),
        onSigninCallback: handleSignin,
      };

      setProviderConfig(config);
    }
  }, [appConfig]);

  const handleSignin = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (!providerConfig) {
    return <Loader />;
  }

  return <Provider {...providerConfig}>{children}</Provider>;
};
