import { useContext } from "react";

import { NotificationContext, NotificationContextType } from "./NotificationContext";

type UseNotificationType = () => NotificationContextType;

export const useNotification: UseNotificationType = () => {
  return useContext(NotificationContext);
};
