import { ProposalType } from "../../types";
import type { Dispatch, SetStateAction } from "react";

export enum CreditApplicationStatusType {
  SUBMITTED = "SUBMITTED",
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN_PROGRESS",
  WAIT_PROPOSAL_ACCEPT = "WAIT_PROPOSAL_ACCEPT",
  WAIT_CARINFO = "WAIT_CARINFO",
  WAIT_FINAL_ACCEPT = "WAIT_FINAL_ACCEPT",
  WAIT_SIGN = "WAIT_SIGN",
  WAIT_PLEDGE = "WAIT_PLEDGE",
  SUCCESS = "SUCCESS",
  REJECT = "REJECT",
}
export interface MainContextType {
  currentLoan: LoanParamsType;
  setCurrentLoan: Dispatch<SetStateAction<LoanParamsType>>;
  onSaveLoanParams: (form: FormType) => void;
}
export interface PersonalInfoType {
  firstName: string;
  lastName: string;
  passport: string;
  company: string;
  position: string;
  salary: string;
  birthDate: string;
  residenceAddress?: string;
  registrationAddress?: string;
}
export interface LoanParamsType {
  personalInfo?: PersonalInfoType;
  loanParams?: {
    loanPurpose: string;
    loanAmount: number;
    creditProgram: string;
    loanTerm: number;
    downPayment: number;
  };
  employmentIncome?: {
    employerName?: string;
    employmentType: string;
    employerInn: string;
    position: string;
    workExperience: number;
    monthlyIncome: number;
  };
  status?: CreditApplicationStatusType;
  applicationId?: string;
}

export type CarInfoDataType = {
  vin: string;
  mileage: number;
  carPrice: number;
  kaskoCost: number;
};

export type CarInfoType = {
  carInfo: CarInfoDataType;
  applicationId: string;
};

export const enum EventType {
  USER_ACCEPT1 = "event_user_accept1",
  USER_ACCEPT2 = "event_user_accept2",
  CAR_INFO = "event_user_carinfo",
}

export type PostEventsType = {
  id: string;
  type: EventType;
  result: string;
};

export type FormType = Record<string, string | boolean | ProposalType>;
