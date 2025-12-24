import { useEffect, useState } from "react";

export const useDynamicScript = ({ url }: { url?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setIsLoaded(false);
    setIsFailed(false);

    element.onload = () => {
      setIsLoaded(true);
    };

    element.onerror = () => {
      setIsLoaded(false);
      setIsFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    isLoaded,
    isFailed,
  };
};
