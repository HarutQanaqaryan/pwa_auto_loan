import { AuthServiceType, UseAuthServiceProps } from "../../types";

export const _useAuthService = ({ onLogin, onLogout }: UseAuthServiceProps): AuthServiceType => {
  const login = () => {
    onLogin();
  };

  const logout = () => {
    onLogout();
  };

  return {
    login,
    logout,
  };
};
