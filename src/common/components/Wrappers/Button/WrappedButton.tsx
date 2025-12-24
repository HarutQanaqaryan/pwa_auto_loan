import React, { ElementType } from "react";

export type ButtonProps<T> = T & {
  type?: "submit" | "reset" | "button" | undefined;
};
export interface WrappedButtonProps<T> {
  props: ButtonProps<T>;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedButton = <T,>({ props, component, elementRef }: WrappedButtonProps<T>) => {
  const Component = component;

  return <Component {...props} ref={elementRef} />;
};
