export interface AuthServiceType {
  login: () => void;
  logout: () => void;
}

export interface UseAuthServiceProps {
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

export interface AuthContextType<T> {
  isAuthenticated?: boolean;
  isInitialized: boolean;
  accessToken?: string;
  profile?: T;
}

export interface UseAuthContextProps<T> {
  isAuthenticated: boolean;
  isInitialized: boolean;
  accessToken?: string;
  profile?: T;
}

export interface ParsedTokenType {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string;
  azp?: string;
  session_state?: string;
  realm_access?: KeycloakRolesType;
  resource_access?: KeycloakResourceAccessType;
  [key: string]: unknown; // Add other attributes here.
}

export interface KeycloakResourceAccessType {
  [key: string]: KeycloakRolesType;
}

export interface KeycloakRolesType {
  roles: string[];
}
