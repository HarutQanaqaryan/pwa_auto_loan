import { CarInfoType, LoanParamsType, PostEventsType } from "../contexts";
import { ProcessInstanceType, StatusType, ProposalType } from "./type";

export interface ApiClientType {
  getApplicationsList: (userId: string) => Promise<LoanParamsType[]>;
  getApplication: (appId: string) => Promise<LoanParamsType>;
  sendNewLoanRequest: (application: LoanParamsType) => Promise<{ applicationId: string }>;
  runLoanBp: (requestData: ProcessInstanceType) => Promise<void>;
  getApplicationStatus: (appId: string) => Promise<StatusType>;
  sendCarInfo: (request: CarInfoType) => Promise<void>;
  getProposalsList: (appId: string) => Promise<ProposalType[]>;
  postEvent: (request: PostEventsType) => Promise<void>;
}
