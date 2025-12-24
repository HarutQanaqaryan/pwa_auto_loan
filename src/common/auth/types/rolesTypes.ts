export interface UseRolesServiceType<T, U> {
  roles: T[] | undefined;
  scopes: U[] | undefined;
  hasRole: (role: T) => boolean;
}

export interface UseRolesServiceProps<T, U> {
  roles: T[] | undefined;
  scopes: U[] | undefined;
}
