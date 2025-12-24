import { ProposalType } from "../../types";
import type { Dispatch, SetStateAction } from "react";

export enum CreditApplicationStatusType {
  SUBMITTED = "SUBMITTED",
  DRAFT = "DRAFT",
  UNDER_REVIEW = "UNDER_REVIEW",
  PROPOSALS_READY = "PROPOSALS_READY",
  READY_FOR_SIGNATURE = "READY_FOR_SIGNATURE",
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
  data?: {
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
    carInfo?: {
      vin: number;
    };
    agree?: boolean;
    selectedProposal?: ProposalType;
    status?: CreditApplicationStatusType;
  };
  applicationId?: string;
}

export type CarInfoDataType = {
  vin: string;
  mileage: number;
  carPrice: number;
  kaskoCost: number;
};

export type CarInfoType = {
  data: CarInfoDataType;
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
  data?: unknown;
};

export type FormType = Record<string, string | boolean | ProposalType>;
