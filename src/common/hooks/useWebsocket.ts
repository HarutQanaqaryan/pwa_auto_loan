import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const CONNECTION_STATUS_MAP = {
  [ReadyState.CONNECTING]: "Connecting",
  [ReadyState.OPEN]: "Open",
  [ReadyState.CLOSING]: "Closing",
  [ReadyState.CLOSED]: "Closed",
  [ReadyState.UNINSTANTIATED]: "Uninstantiated",
};

export const useWebsocket = <Incoming, Outgoing>(websocketUrl: string) => {
  const [isReady, setIsReady] = useState(false);
  const [messageHistory, setMessageHistory] = useState<Incoming[]>([]);
  const [error, setError] = useState<unknown>();

  const { sendMessage, lastMessage, readyState } = useWebSocket(websocketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const parsedJson = JSON.parse(lastMessage.data) as Incoming;
        setMessageHistory((prev) => prev.concat(parsedJson));
      } catch (e) {
        setError(e);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (CONNECTION_STATUS_MAP[readyState] === CONNECTION_STATUS_MAP[ReadyState.OPEN]) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [readyState]);

  const clear = () => {
    setMessageHistory([]);
  };

  const lastExistedMessage: Incoming | undefined = messageHistory[messageHistory.length - 1];

  const sendJsonMessage = (message: Outgoing) => sendMessage(new Blob([JSON.stringify(message)]));

  return {
    isReady,
    messageHistory,
    lastMessage: lastExistedMessage,
    sendMessage: sendJsonMessage,
    clear,
    error,
  };
};
