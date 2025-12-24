import React, { useMemo } from "react";

import { loadComponent } from "@common/helpers";
import { useDynamicScript } from "@common/hooks";
import { DynamicModuleProps } from "@common/types";
import { Loader } from "@common/ui-kit";

export const DynamicModule = ({ module, init }: DynamicModuleProps) => {
  const { isLoaded, isFailed } = useDynamicScript({
    url: module?.filename ? window.location.origin + "/" + module?.filename : undefined,
  });

  const Component = useMemo(
    () => (module ? React.lazy(loadComponent(module.scope, module.module)) : () => <Loader />),
    [module],
  );

  if (!module || !module.filename || isFailed) {
    return null;
  }

  if (!isLoaded && !isFailed) {
    return <Loader />;
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <Component {...(module.props || {})} init={init} />
    </React.Suspense>
  );
};
