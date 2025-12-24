import React, { ElementType } from "react";

export interface WrappedRadioProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedRadio = <T,>({ props, component, elementRef }: WrappedRadioProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
