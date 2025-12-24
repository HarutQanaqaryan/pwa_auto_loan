import React, { ElementType } from "react";

export type TypographyProps<T> = T & {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  ["aria-label"]?: string;
  children?: React.ReactNode;
};

export interface WrappedTypographyProps<T> {
  props: TypographyProps<T>;
  component: ElementType;
  elementRef?: React.ForwardedRef<HTMLElement>;
}

export const WrappedTypography = <T,>({ props, component, elementRef }: WrappedTypographyProps<T>) => {
  const Component = component;

  return (
    <Component {...props} ref={elementRef}>
      {props.children}
    </Component>
  );
};
