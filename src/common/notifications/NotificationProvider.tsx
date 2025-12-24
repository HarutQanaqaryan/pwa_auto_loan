import React, { useEffect, useReducer, useState, useMemo, useCallback, useRef } from "react";

import { NotificationContext, NotificationItemParamType } from "./NotificationContext";
import { NotificationItemType } from "./types";

interface NotificationProviderType {
  children: JSX.Element;
}

type StateType = NotificationItemType[];
type ActionType = { type: "add"; item: NotificationItemType } | { type: "remove"; key: number | string };

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      return state.filter((item) => item.key !== action.key);
  }
}

export const NotificationProvider = ({ children }: NotificationProviderType) => {
  const [notificationItems, setNotificationItems] = useState<NotificationItemType[]>([]);
  const [items, dispatchItems] = useReducer(reducer, []);

  const conter = useRef(0);

  const onChangeItems = useCallback(
    (params?: NotificationItemParamType) => {
      conter.current = conter.current + 1;
      const itemKey = conter.current;

      if (params) {
        const item: NotificationItemType = {
          key: itemKey,
          title: params.name || "",
          message: `${params.message}` || "",
          status: params.type || "error",
          autoClose: 5,
          onClose: () => dispatchItems({ type: "remove", key: itemKey }),
          withCloseButton: params.withCloseButton || false,
          onlyMessage: params.name ? false : true,
          view: "outlined",
          icon: params.icon,
        };

        dispatchItems({ type: "add", item });
      }
    },
    [conter],
  );

  const NotificationContextValue = useMemo(
    () => ({
      items: notificationItems,
      onChangeItems,
    }),
    [notificationItems, onChangeItems],
  );

  useEffect(() => {
    setNotificationItems(items);
  }, [items]);

  return <NotificationContext.Provider value={NotificationContextValue}>{children}</NotificationContext.Provider>;
};
