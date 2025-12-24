import React, { ElementType } from "react";

export interface WrappedCalendarProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedCalendar = <T,>({ props, component, elementRef }: WrappedCalendarProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
