import React from "react";

import { NotificationItemStatusType, NotificationItemType } from "./types";

export interface NotificationContextType {
  items: NotificationItemType[];
  onChangeItems: (params?: NotificationItemParamType) => void;
}

export type NotificationItemParamType = {
  name?: string | number;
  message?: string | number;
  type?: NotificationItemStatusType;
  withCloseButton?: boolean;
  icon?: React.ReactNode;
};

export const NotificationContext = React.createContext<NotificationContextType>({
  items: [],
  onChangeItems: () => {
    throw new Error("Event handler not defined.");
  },
});
