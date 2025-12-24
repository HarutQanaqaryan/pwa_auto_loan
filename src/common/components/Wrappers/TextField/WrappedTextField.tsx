import React, { ElementType } from "react";

export interface WrappedTextFieldProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedTextField = <T,>({ props, component, elementRef }: WrappedTextFieldProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
