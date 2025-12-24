import React, { ElementType } from "react";

export interface WrappedTabsProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedTabs = <T,>({ props, component, elementRef }: WrappedTabsProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
