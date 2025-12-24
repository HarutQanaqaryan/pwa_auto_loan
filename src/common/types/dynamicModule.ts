/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslateType } from "@common/types";

export interface ModuleType<T = Record<string, unknown>> {
  filename: string;
  scope: string;
  module: string;
  path?: string;
  props?: T;
}

export interface DynamicModuleProps<T = Record<string, unknown>> {
  module?: ModuleType<T>;
  node?: HTMLDivElement;
  enabled?: boolean;
  init?: object;
  callback?: (value: any) => void;
}

export type InitObjectType = {
  init: {
    loadModuleMessages?: (module: string) => Promise<boolean>;
    translate?: TranslateType;
  };
  callback?: (value: any) => void;
};
