import axios from "axios";

import { IntlMessagesListType } from "./types";

export const fetchMessagesFile = async (locale: string, path: string) => {
  const json = (
    await axios.get(`${path}/${locale.toLowerCase()}.json`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "json",
    })
  ).data;

  return json;
};

export const reducer = async (acc: IntlMessagesListType, key: string, path: string) => {
  try {
    const data = await fetchMessagesFile(key, path);
    return { ...(await acc), [key]: data };
  } catch (error) {
    return { ...(await acc), [key]: { error } };
  }
};

export const mergeMessages = (a: IntlMessagesListType, b: IntlMessagesListType) => {
  const x = Object.keys(a);

  const y: IntlMessagesListType = {};

  x.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    y[key] = { ...a[key], ...b[key] };
  });

  return y;
};
