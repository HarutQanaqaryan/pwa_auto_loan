import React from "react";

import { Button as ButtonKit, Props } from "nx-design/Button";

import { ButtonProps, WrappedButton } from "../../components/Wrappers";

export const Button = React.forwardRef<HTMLElement, ButtonProps<Props>>((props, ref) => {
  return <WrappedButton component={ButtonKit} props={props} elementRef={ref} />;
});
