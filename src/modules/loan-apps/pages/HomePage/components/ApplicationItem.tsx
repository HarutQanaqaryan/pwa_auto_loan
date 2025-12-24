import { useNavigate } from "react-router-dom";

import { useTranslate } from "@common/hooks";

import { ClockCircleOutlined, FileTextOutlined, SignatureOutlined } from "@ant-design/icons";
import { Button, Card, Tag, Typography } from "antd";

import { CreditApplicationStatusType, useMainContext, type LoanParamsType } from "../../../contexts";
import styled from "styled-components";
import { AppInfo } from "./AppInfo";

const { Title } = Typography;

const StyledCard = styled(Card)`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (width <= 768px) {
    width: 100%;
  }
`;

const StyledTag = styled(Tag)`
  white-space: pre-wrap;
  margin-bottom: 2px;
`;

export const ApplicationItem = ({ loan }: { loan: LoanParamsType; index: number }) => {
  const { setCurrentLoan } = useMainContext();
  const { translate } = useTranslate();
  const navigate = useNavigate();

  const onSetCurrentLoan = () => {
    setCurrentLoan(loan);
    switch (loan?.data?.status) {
      case CreditApplicationStatusType.SUBMITTED:
      case CreditApplicationStatusType.DRAFT:
        navigate("/loan-apps/new");
        break;
      case CreditApplicationStatusType.PROPOSALS_READY:
        navigate(`/loan-apps/proposals/${loan?.applicationId}`);
        break;
      case CreditApplicationStatusType.READY_FOR_SIGNATURE:
        navigate(`/loan-apps/accept-loan/${loan?.applicationId}`);
        break;
    }
  };

  switch (loan?.data?.status) {
    case CreditApplicationStatusType.SUBMITTED:
    case CreditApplicationStatusType.DRAFT:
    case undefined:
      return (
        <StyledCard actions={[<Button onClick={onSetCurrentLoan}>{translate("go_to_application")}</Button>]}>
          <Title level={4} style={{ margin: 0 }}>
            <StyledTag color={"blue"}>
              <ClockCircleOutlined /> {translate("application_sent")}
            </StyledTag>
          </Title>
          <AppInfo loan={loan} />
        </StyledCard>
      );
    case CreditApplicationStatusType.PROPOSALS_READY:
      return (
        <StyledCard actions={[<Button onClick={onSetCurrentLoan}>{translate("go_to_proposals")}</Button>]}>
          <Title level={4} style={{ margin: 0 }}>
            <StyledTag color={"orange"}>
              <FileTextOutlined /> {translate("proposals_received")}
            </StyledTag>
          </Title>
          <AppInfo loan={loan} />
        </StyledCard>
      );
    case CreditApplicationStatusType.READY_FOR_SIGNATURE:
      return (
        <StyledCard actions={[<Button onClick={onSetCurrentLoan}>{translate("go_to_signing")}</Button>]}>
          <Title level={4} style={{ margin: 0 }}>
            <StyledTag color={"green"}>
              <SignatureOutlined /> {translate("ready_for_signature")}
            </StyledTag>
          </Title>
          <AppInfo loan={loan} />
        </StyledCard>
      );
  }
};
