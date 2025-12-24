import React, { ElementType } from "react";

export interface WrappedTableProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedTable = <T,>({ props, component, elementRef }: WrappedTableProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
