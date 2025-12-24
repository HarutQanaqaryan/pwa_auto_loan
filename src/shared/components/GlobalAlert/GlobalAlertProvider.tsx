import { createContext, useState, ReactNode, useCallback, useEffect } from "react";

import { EventBusService } from "@common/event-bus-service";
import { GLOBAL_ALERT_TYPES, AlertContextType, GlobalAlertMessagesType } from "@common/types";

const defaultState = {
  messageType: GLOBAL_ALERT_TYPES.choose_card,
  visible: false,
  isHideOnTime: false,
  setGlobalAlertMessageType: (messageType: GlobalAlertMessagesType) => {
    console.warn("not implemented yet", messageType);
  },
  hideAlert: () => {
    console.warn("not implemented yet");
  },
  handleHideOnTime: () => {
    console.warn("not implemented yet");
  },
  switchGlobalAlertVisible: () => {
    console.warn("not implemented yet");
  },
};

export const AlertContext = createContext<AlertContextType>(defaultState);

const getInitialVisibility = () => {
  const storedVisibility = sessionStorage.getItem("alertVisible");

  if (!storedVisibility) {
    return true;
  }

  return storedVisibility === "true" ? true : false;
};

const setSessionStorageAlertVisibility = (visibility: boolean) => {
  sessionStorage.setItem("alertVisible", String(visibility));
};

export const GlobalAlertProvider = ({ children }: { children: ReactNode }) => {
  const [messageType, setMessageType] = useState<GlobalAlertMessagesType>(GLOBAL_ALERT_TYPES.choose_card);
  const [visible, setVisible] = useState<boolean>(getInitialVisibility());
  const [isHideOnTime, setIsHideOnTime] = useState(false);

  const setGlobalAlertMessageType = useCallback((type: GlobalAlertMessagesType) => {
    setMessageType(type);
    setIsHideOnTime(false);
  }, []);

  useEffect(() => {
    const unsubscribe = EventBusService.subscribe("GLOBAL_ALERT", (data) => {
      setGlobalAlertMessageType(data.messageType);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setSessionStorageAlertVisibility(visible);
  }, [visible]);

  const hideAlert = useCallback(() => {
    setVisible(false);
  }, []);

  const handleHideOnTime = useCallback(() => {
    setIsHideOnTime(true);
  }, []);

  const switchGlobalAlertVisible = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  const contextValue = {
    messageType,
    visible,
    isHideOnTime,
    setGlobalAlertMessageType,
    hideAlert,
    handleHideOnTime,
    switchGlobalAlertVisible,
  };

  return <AlertContext.Provider value={contextValue}>{children}</AlertContext.Provider>;
};
