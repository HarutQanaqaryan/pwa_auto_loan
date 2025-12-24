import { useAuth } from "react-oidc-context";

import { _useAuthService } from "./_useAuthService";

export const useAuthService = () => {
  const { signinRedirect, signoutSilent, removeUser } = useAuth();

  const onLogin = async () => {
    const redirectUri = localStorage.getItem("lastRoute") || undefined;
    localStorage.removeItem("lastRoute");
    await signinRedirect({ redirect_uri: redirectUri });
  };

  const onLogout = async () => {
    await signoutSilent();
    await removeUser();
  };

  const authService = _useAuthService({
    onLogin: onLogin,
    onLogout: onLogout,
  });

  return authService;
};
