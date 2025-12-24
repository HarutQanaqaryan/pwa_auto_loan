import jwt_decode from "jwt-decode";

const originalReactAppConfig = { ...window._REACT_APP };

export const getAccessTokenFromSessionStorage = () => {
  let accessToken = "";

  const key = `oidc.user:${originalReactAppConfig.authProviderUrl}:${originalReactAppConfig.clientId}`;
  const value = sessionStorage.getItem(key);

  if (value) {
    const json = JSON.parse(value);
    accessToken = json.access_token || "";
  }

  return accessToken;
};

export const getParsedToken = <T>(accessToken: string) => {
  const parsedToken = jwt_decode<T>(accessToken);

  return parsedToken;
};
