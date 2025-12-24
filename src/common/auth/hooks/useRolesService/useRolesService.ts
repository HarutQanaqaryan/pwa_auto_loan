import { useMemo } from "react";
import { useAuth } from "react-oidc-context";

import { getParsedToken } from "@common/helpers";

import { _useRolesService } from "./_useRolesService";
import { ParsedTokenType } from "../../types";

export const useRolesService = () => {
  const { user } = useAuth();

  const accessToken = user?.access_token;

  const parsedToken = useMemo(() => {
    if (accessToken) {
      return getParsedToken<ParsedTokenType>(accessToken);
    } else return undefined;
  }, [accessToken]);

  const scopes = user?.scopes;

  const roles = useMemo(() => parsedToken?.realm_access?.roles || [], [parsedToken]);

  const rolesService = _useRolesService<string, string>({ roles, scopes });

  return rolesService;
};
