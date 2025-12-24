import { useCallback, useState } from "react";

import { mergeMessages, reducer } from "./helpers";
import { IntlMessagesListType } from "./types";

export const useLoadMessages = ({ availableLocales }: { availableLocales: string[] }) => {
  const [messages, setMessages] = useState<IntlMessagesListType | undefined>();

  const getMessages = useCallback(
    async (path: string) => {
      if (availableLocales) {
        const moduleMessages = await availableLocales.reduce((acc, key) => reducer(acc, key, path), {});

        setMessages((state) => (state ? mergeMessages(state, moduleMessages) : moduleMessages));
      }
    },
    [availableLocales],
  );

  return { messages, getMessages };
};
