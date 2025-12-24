import React, { ElementType } from "react";

export interface WrappedSwitchProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedSwitch = <T,>({ props, component, elementRef }: WrappedSwitchProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
