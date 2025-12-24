import { EventsType, EventsDefenitionType, UnsubscribeType } from "./types";

const publish = <T extends EventsType>(eventName: T, payload?: EventsDefenitionType[T]): void => {
  const event = payload ? new CustomEvent(eventName, { detail: payload }) : new CustomEvent(eventName);
  window.dispatchEvent(event);
};

const isCustomEvent = (event: Event): event is CustomEvent => {
  return "detail" in event;
};

const subscribe = <T extends EventsType>(
  eventName: T,
  handlerFn: (payload: EventsDefenitionType[T]) => void,
): UnsubscribeType => {
  const eventHandler = (event: Event) => {
    if (isCustomEvent(event)) {
      const eventPayload: EventsDefenitionType[T] = event.detail;
      handlerFn(eventPayload);
    }
  };

  window.addEventListener(eventName, eventHandler);

  return () => {
    window.removeEventListener(eventName, eventHandler);
  };
};

export const EventBusService = {
  publish,
  subscribe,
};
