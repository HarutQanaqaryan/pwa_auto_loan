// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react" />
/// <reference types="react-dom" />

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const SRC: string;
  export default SRC;
}

declare module "*.bmp" {
  const SRC: string;
  export default SRC;
}

declare module "*.gif" {
  const SRC: string;
  export default SRC;
}

declare module "*.jpg" {
  const SRC: string;
  export default SRC;
}

declare module "*.jpeg" {
  const SRC: string;
  export default SRC;
}

declare module "*.png" {
  const SRC: string;
  export default SRC;
}

declare module "*.avif" {
  const SRC: string;
  export default SRC;
}

declare module "*.webp" {
  const SRC: string;
  export default SRC;
}
