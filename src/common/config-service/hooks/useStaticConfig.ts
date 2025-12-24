import { useState } from "react";

import { AppConfigType, ConfigStatusType } from "../types";

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    _REACT_APP: AppConfigType;
  }
}

export const useStaticConfig = () => {
  const [configStatus, setConfigStatus] = useState<ConfigStatusType>(ConfigStatusType.IS_INITIAL);

  const isLoaded = configStatus === ConfigStatusType.IS_LOADED;

  const onLoad = () => {
    setConfigStatus(ConfigStatusType.IS_LOADED);
  };

  const onError = () => {
    setConfigStatus(ConfigStatusType.IS_ERROR);
  };

  const fetchConfig = () => {
    const script = document.createElement("script");

    const node = document.head || document.body;

    script.type = "text/javascript";

    script.async = true;

    script.src = `${__webpack_public_path__}config.js`;

    if (onLoad) {
      script.onload = onLoad;
    }

    if (onError) {
      script.onerror = onError;
    }

    node.appendChild(script);
  };

  return { staticConfig: isLoaded ? window._REACT_APP : null, isLoaded, fetchConfig };
};
