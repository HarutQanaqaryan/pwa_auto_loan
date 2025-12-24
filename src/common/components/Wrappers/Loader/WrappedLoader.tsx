import React, { ElementType } from "react";

export interface WrappedLoaderProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedLoader = <T,>({ props, component, elementRef }: WrappedLoaderProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
