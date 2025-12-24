import { useContext } from "react";

import { AlertContextType } from "@common/types";

import { AlertContext } from "../components/GlobalAlert";

export const useGlobalAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
