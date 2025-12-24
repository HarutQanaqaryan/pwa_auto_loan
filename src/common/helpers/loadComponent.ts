/* eslint-disable @typescript-eslint/ban-ts-comment */
export const loadComponent = (scope: string, module: string) => async () => {
  await __webpack_init_sharing__("default");
  //@ts-ignore
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  //@ts-ignore
  const factory = await window[scope].get(module);
  const Module = factory();
  return Module;
};

export const loadDefaultComponent = (scope: string, module: string) => async () => {
  await __webpack_init_sharing__("default");
  //@ts-ignore
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  //@ts-ignore
  const factory = await window[scope].get(module);
  const Module = factory();
  return Module.default;
};
