import { GlobalAlertMessagesType, NotificationItemStatusType } from "@common/types";

export interface NotificationPayloadType {
  message: string;
  sender?: string;
  type?: NotificationItemStatusType;
  withCloseButton?: boolean;
  icon?: React.ReactNode;
}

export type EventsDefenitionType = {
  NOTIFICATION: NotificationPayloadType;
  GLOBAL_ALERT: {
    messageType: GlobalAlertMessagesType;
  };
};

export type EventsType = keyof EventsDefenitionType;

export type UnsubscribeType = () => void;
