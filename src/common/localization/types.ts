import { MessageFormatElement } from "react-intl";

export type IntlMessagesListType = {
  [key in string]: Record<string, string> | Record<string, MessageFormatElement[]>;
};
