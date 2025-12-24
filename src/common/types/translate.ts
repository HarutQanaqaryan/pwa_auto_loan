import { MessageFormatElement } from "react-intl";

export type TranslateType = (
  id: string,
  messageParams?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description?: string | Record<string, any>;
    defaultMessage?: string | MessageFormatElement[];
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any,
) => string;
