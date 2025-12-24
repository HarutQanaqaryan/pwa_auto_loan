import { CreditApplicationStatusType } from "../contexts";

export type StatusType = {
  status: CreditApplicationStatusType;
  timestamp: string;
};

export type ProposalType = {
  proposalId: string;
  applicationId: string;
  productId: string;
  approvedSum: number;
  currency: string;
  approvedRepaymentPeriod: number;
  approvedInterestRate: number;
  proposalPeriod: number;
  proposalDate: string;
};

export type ProcessInstanceType = {
  bpmnProcessId: string;
  variables: {
    appId: string;
  };
};
