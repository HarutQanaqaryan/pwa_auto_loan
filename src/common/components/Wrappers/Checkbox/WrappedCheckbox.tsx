import React, { ElementType } from "react";

export interface WrappedCheckboxProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedCheckbox = <T,>({ props, component, elementRef }: WrappedCheckboxProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
