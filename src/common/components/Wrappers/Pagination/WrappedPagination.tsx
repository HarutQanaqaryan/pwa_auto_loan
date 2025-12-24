import React, { ElementType } from "react";

export interface WrappedPaginationProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedPagination = <T,>({ props, component, elementRef }: WrappedPaginationProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
