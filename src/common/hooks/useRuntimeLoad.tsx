import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { loadDefaultComponent } from "@common/helpers";
import { DynamicModuleProps } from "@common/types";

import { useDynamicScript } from "./useDynamicScript";

export const useRuntimeLoad = ({ module, node, enabled, init, callback }: DynamicModuleProps) => {
  const [state, setState] = useState<"unmounted" | "loading" | "mounted" | "error">("unmounted");
  const [error, setError] = useState<Error | null>();

  const { isLoaded, isFailed } = useDynamicScript({
    url: module?.filename,
  });

  const handleMount = useCallback(
    (node?: HTMLElement | null) => {
      if (node && module && isLoaded) {
        setState("loading");
        setError(null);

        const component = loadDefaultComponent(module.scope, module.module);

        component()
          .then((module) => {
            module({ node, init, callback }).invoke();
            setState("mounted");
          })
          .catch((e: Error) => {
            setError(e);
            setState("error");
          });
      }
    },
    [module, isLoaded, init, callback],
  );

  const handleUnmount = useCallback(() => {
    if (node) {
      ReactDOM.unmountComponentAtNode(node);

      setState("unmounted");
    }
  }, [node]);

  useEffect(() => {
    if (enabled && state !== "mounted" && !isFailed && state !== "error") {
      handleMount(node);
      return;
    }

    if (enabled === false && state === "mounted") {
      handleUnmount();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, state, handleMount, handleUnmount]);

  useEffect(() => {
    if (isFailed) {
      setError(new Error("Failed to load remote entry file"));
    }
  }, [isFailed]);

  return {
    state,
    error,
    handleMount,
    handleUnmount,
  };
};
