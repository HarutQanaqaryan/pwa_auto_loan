import React from "react";

import { useAuthService } from "@common/auth";
import { Loader } from "@common/ui-kit";

interface PrivateRouteProps extends React.PropsWithChildren {
  isAuthenticated?: boolean;
  isInitialized: boolean;
}

export const PrivateRoute = ({ isAuthenticated, isInitialized, children }: PrivateRouteProps) => {
  const { login } = useAuthService();
  if (!isInitialized) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    localStorage.setItem("lastRoute", window.location.href);
    login();
  }

  return children;
};
