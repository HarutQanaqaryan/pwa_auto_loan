import React, { ElementType } from "react";

export interface WrappedSelectProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedSelect = <T,>({ props, component, elementRef }: WrappedSelectProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
