import { UseRolesServiceProps, UseRolesServiceType } from "../../types";

export const _useRolesService = <T = string, U = string>({
  roles,
  scopes,
}: UseRolesServiceProps<T, U>): UseRolesServiceType<T, U> => {
  const hasRole = (role: T) => {
    return !!roles?.includes(role);
  };

  return { roles, scopes, hasRole };
};
