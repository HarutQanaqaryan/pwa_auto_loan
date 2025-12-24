import { useMutation, useQueries, useQuery } from "react-query";

import { useAuthContext } from "@common/auth";

import { apiClient } from "../api";

export const useGetApplicationsStatuses = (ids: string[]) => {
  const queries = useQueries(
    ids.map((id) => ({
      queryKey: ["status", id],
      queryFn: () => apiClient.getApplicationStatus(id),
      retry: false,
      useErrorBoundary: false,
      onError: (e: object) => console.log(e),
      refetchInterval: 2 * 60 * 1000,
      enabled: !!ids?.length,
    })),
  );

  return queries.map((query, index) => ({
    status: query.data?.status,
    appId: ids[index],
    isLoading: query.isLoading,
    isError: query.isError,
  }));
};

export const useGetApplicationStatus = (id: string) => {
  const queryKey = "status";

  const {
    data: status,
    isLoading,
    isError,
  } = useQuery([queryKey, id], () => apiClient.getApplicationStatus(id), {
    retry: false,
    useErrorBoundary: false,
    enabled: !!id,
  });

  return { status, isLoading, isError };
};

export const useGetApplication = (id: string) => {
  const queryKey = "applications";

  const { data: application, isLoading } = useQuery([queryKey, id], () => apiClient.getApplication(id), {
    retry: false,
    useErrorBoundary: false,
  });

  return { application, isLoading };
};

export const useGetApplicationsList = () => {
  const queryKey = "applications";

  const { profile } = useAuthContext();

  const { data: applications, isLoading } = useQuery(
    [queryKey],
    () => apiClient.getApplicationsList(profile?.userId || ""),
    {
      retry: false,
      useErrorBoundary: false,
    },
  );

  return { applications: applications?.filter((el) => el?.data && el?.data?.status), isLoading };
};

export const usePostApplication = () => {
  const { isLoading, isError, data, isSuccess, mutate } = useMutation(apiClient.sendNewLoanRequest, { retry: false });

  return { data, isLoading, isError, isSuccess, mutate };
};

export const useRunLoanBp = () => {
  const { isLoading, isSuccess, mutate: runLoanBp } = useMutation(apiClient.runLoanBp, { retry: false });

  return { isLoading, isSuccess, runLoanBp };
};

export const useGetProposals = (id?: string) => {
  const queryKey = "proposal";
  const { isLoading, isSuccess, data } = useQuery(
    [queryKey, id],
    () => (id ? apiClient.getProposalsList(id) : void 0),
    {
      retry: false,
      enabled: !!id,
    },
  );

  return { isLoading, isSuccess, data };
};

export const usePostEvent = () => {
  const {
    isLoading,
    isSuccess,
    mutate: postEvent,
  } = useMutation(apiClient.postEvent, {
    retry: false,
  });

  return { isLoading, isSuccess, postEvent };
};

export const useSendCarInfo = () => {
  const { isLoading, isSuccess, mutate } = useMutation(apiClient.sendCarInfo, { retry: false });

  return { isLoading, isSuccess, mutate };
};
