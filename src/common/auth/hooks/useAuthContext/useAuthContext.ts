import { useAuth } from "react-oidc-context";

import { _useAuthContext } from "./_useAuthContext";

export const useAuthContext = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAuthenticated, isLoading, user } = useAuth();

  const authService = _useAuthContext({
    isAuthenticated: isAuthenticated,
    isInitialized: !isLoading,
    accessToken: user?.access_token,
    profile: { roles: ["kredit_manager"], preferred_username: "Maria A.", userId: user?.profile.userId as string }, // user?.profile, user?.profile.preferred_username
  });

  return authService;
};
