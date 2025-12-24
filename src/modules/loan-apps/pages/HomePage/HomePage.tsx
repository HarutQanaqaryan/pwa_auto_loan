import { useNavigate } from "react-router-dom";

import { useTranslate } from "@common/hooks";

import { Card, Button, Empty, Spin } from "antd";

import { LoanParamsType, useMainContext } from "../../contexts";
import { ApplicationItem } from "./components/ApplicationItem";
import { useGetApplicationsList, useGetApplicationsStatuses } from "../../hooks";
import styled from "styled-components";
import { useEffect, useMemo } from "react";

const StyledApplicationsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (width <= 768px) {
    flex-direction: column;
  }
`;

const StyledCard = styled(Card)`
  @media (width >= 768px) {
    width: 80%;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;

export const HomePage = () => {
  const { setCurrentLoan } = useMainContext();
  const { translate } = useTranslate();
  const navigate = useNavigate();
  const { applications, isLoading } = useGetApplicationsList();
  const statuses = useGetApplicationsStatuses(applications?.map((el) => el.applicationId ?? "") ?? []);

  useEffect(() => {
    setCurrentLoan({});
  }, [setCurrentLoan]);

  const statusMap = statuses?.reduce(
    (acc, status) => ({ ...acc, [status.appId]: status.status }),
    {} as Record<string, string | undefined>,
  );

  const updatedApplications = useMemo(
    () =>
      applications?.map((app) => ({
        ...app,
        data: {
          ...app.data,
          status: app?.applicationId ? (statusMap[app?.applicationId] ?? app?.data?.status) : app?.data?.status,
        },
      })) as LoanParamsType[],
    [applications, statusMap],
  );

  return (
    <Spin spinning={isLoading}>
      <StyledWrapper>
        <StyledCard
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {translate("my_active_applications")}{" "}
              <Button
                type="primary"
                block
                onClick={() => navigate("/loan-apps/new")}
                style={{
                  width: "fit-content",
                }}
              >
                {translate("dashboard.start.button")}
              </Button>
            </div>
          }
        >
          {updatedApplications?.length ? (
            <StyledApplicationsWrapper>
              {updatedApplications?.map((el, index) => (
                <ApplicationItem loan={el} index={index + 1} key={el.applicationId} />
              ))}
            </StyledApplicationsWrapper>
          ) : (
            <Empty description={translate("no_active_applications")} />
          )}
        </StyledCard>
      </StyledWrapper>
    </Spin>
  );
};
