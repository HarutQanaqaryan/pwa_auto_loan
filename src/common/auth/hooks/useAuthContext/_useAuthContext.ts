import { AuthContextType, UseAuthContextProps } from "../../types";

export const _useAuthContext = <T>({
  isAuthenticated,
  isInitialized,
  accessToken,
  profile,
}: UseAuthContextProps<T>): AuthContextType<T> => {
  return {
    isAuthenticated,
    isInitialized,
    accessToken,
    profile,
  };
};
