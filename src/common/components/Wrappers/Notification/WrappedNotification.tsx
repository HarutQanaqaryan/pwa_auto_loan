import React, { ElementType } from "react";

export type NotificationProps<T> = T & {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
};

export interface WrappedNotificationProps<T> {
  props: T;
  component: ElementType;
}

export const WrappedNotification = <T,>({ props, component }: WrappedNotificationProps<T>) => {
  const Component = component;

  return <Component {...props} />;
};
