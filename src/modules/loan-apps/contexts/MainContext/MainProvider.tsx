import { useState, type ReactNode } from "react";
import { MainContext } from "./MainContext";
import { LoanParamsType, ProposalType } from "./types";

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [currentLoan, setCurrentLoan] = useState<LoanParamsType>({});

  const onSaveLoanParams = (form: Record<string, string | boolean | ProposalType>) => {
    setCurrentLoan((prev) => {
      const payload = {
        data: {
          ...prev.data,
          ...form,
        },
      };
      return payload;
    });
  };

  return (
    <MainContext.Provider
      value={{
        currentLoan,
        setCurrentLoan,
        onSaveLoanParams,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
