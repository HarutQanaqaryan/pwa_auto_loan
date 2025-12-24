import { getAxiosInstance } from "@common/data-access";

import { ApiClientType, ProcessInstanceType, StatusType, ProposalType } from "../types";
import { CarInfoType, PostEventsType, LoanParamsType } from "../contexts";

const axiosLoansInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/application/api/v1",
});

const axiosProposalInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/proposal/api/v1",
});

const appStatusApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/status/api/v1/statuses",
});

const appCarInfoApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/carinfo/api/v1/carinfos",
});

const processApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/bpmn-camunda-process",
});

const eventsApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/event/api/v1",
});

const getApplicationsList = async (userId: string) => {
  const { data } = await axiosLoansInstance.request<LoanParamsType[]>({
    url: "/applications",
    method: "GET",
    params: {
      userId: userId,
    },
  });

  return data;
};

const getProposalsList = async (appId: string) => {
  const { data } = await axiosProposalInstance.request<ProposalType[]>({
    url: `/proposals/${appId}`,
    method: "GET",
  });

  return data;
};

const getApplication = async (id: string) => {
  const { data } = await axiosLoansInstance.request<LoanParamsType>({
    url: "/applications/" + id,
    method: "GET",
  });

  return data;
};

const getApplicationStatus = async (appId: string) => {
  const { data } = await appStatusApiInstance.request<StatusType>({
    url: appId,
    method: "GET",
  });

  return data;
};

const sendNewLoanRequest = async (formData: LoanParamsType) => {
  try {
    const { data } = await axiosLoansInstance.request({
      url: "/applications",
      method: "POST",
      data: formData,
    });

    return data;
  } catch (error) {
    console.error("Error submitting form", error);
    throw error;
  }
};

const runLoanBp = async (requestData: ProcessInstanceType) => {
  await processApiInstance.request<void>({
    url: "/process-instances",
    method: "POST",
    data: requestData,
  });
};

const sendCarInfo = async (request: CarInfoType) => {
  await appCarInfoApiInstance.request<void>({
    url: request.applicationId,
    method: "POST",
    data: request,
  });
};

const postEvent = async (request: PostEventsType) => {
  await eventsApiInstance.request<void>({
    url: "events",
    method: "POST",
    data: request,
  });
};

export const apiClient: ApiClientType = {
  getApplicationsList,
  sendNewLoanRequest,
  runLoanBp,
  getApplicationStatus,
  getApplication,
  sendCarInfo,
  getProposalsList,
  postEvent,
};
