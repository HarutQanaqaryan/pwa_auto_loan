import React, { ElementType } from "react";

export interface WrappedProgressLineProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLDivElement>;
}

export const WrappedProgressLine = <T,>({ props, component, elementRef }: WrappedProgressLineProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
