import React, { MouseEventHandler } from "react";

import { Typography as TypographyKit, Props } from "nx-design/Typography";

import { TypographyProps, WrappedTypography } from "../../components/Wrappers";

type UpdatedProps = Omit<Props, "view"> & {
  view?: Props["view"] | "dark";
  onClick?: MouseEventHandler | undefined;
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps<UpdatedProps>>((props, ref) => {
  return (
    <WrappedTypography
      component={TypographyKit}
      props={{ ...props, view: props.view === "dark" ? "brand" : props.view }} // rename brand to dark
      elementRef={ref}
    />
  );
});
