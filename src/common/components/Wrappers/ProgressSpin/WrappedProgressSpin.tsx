import React, { ElementType } from "react";

export interface WrappedProgressSpinProps<T> {
  props: T;
  component: ElementType;
  elementRef?: React.ForwardedRef<SVGSVGElement>;
}

export const WrappedProgressSpin = <T,>({ props, component, elementRef }: WrappedProgressSpinProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
