import { Card, List, Typography, Space, Tag, Button, Select } from "antd";
import { EventType, useMainContext } from "../../../contexts";
import { useTranslate } from "@common/hooks";
import { ActionsWrapper } from "../../ActionsWrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useGetProposals, usePostEvent } from "../../../hooks";
import { ProposalType } from "../../../types";

const { Title } = Typography;

const StyledSpace = styled(Space)`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StyledListItem = styled(List.Item)`
  padding: 16px 0;

  @media (width <= 768px) {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

export const BtnsWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  height: fit-content;
  margin-left: auto;

  @media (width <= 768px) {
    margin-top: 20px;
    flex-wrap: wrap;
  }
`;

export const Proposals = () => {
  const { currentLoan } = useMainContext();
  const { translate, formatNumber } = useTranslate();
  const [selectedSignType, setSelectedSignType] = useState("electronicSigning");
  const navigate = useNavigate();
  const { data: proposals } = useGetProposals(currentLoan?.applicationId);
  const { postEvent } = usePostEvent();

  const signingOptions = [
    {
      value: "electronicSigning",
      label: translate("electronicSigning"),
    },
    {
      value: "manualSigning",
      label: translate("manualSigning"),
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const getPeriodText = (period: number) => {
    return `${period} ${translate("proposal.period.months")}`;
  };

  const onSelectProposal = (proposal: ProposalType) => {
    if (currentLoan?.applicationId) {
      postEvent(
        {
          id: currentLoan?.applicationId,
          type: EventType.USER_ACCEPT1,
          result: "OK",
          data: { ...proposal, signType: selectedSignType },
        },
        {
          onSuccess: () => {
            navigate(`/loan-apps/${currentLoan?.applicationId}/car-info`);
          },
        },
      );
    }
  };

  return (
    <Card title={translate("step3.title")}>
      <Title level={5} style={{ marginBottom: 24 }}>
        {translate("step3.availableProposals")}
      </Title>
      <List
        dataSource={proposals}
        renderItem={(proposal) => (
          <StyledListItem>
            <List.Item.Meta
              title={
                <StyledSpace>
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    {formatNumber(proposal?.approvedSum)} {proposal?.currency}
                  </span>

                  <Tag color="blue">
                    {translate("proposal.approvedInterestRate")}: {proposal?.approvedInterestRate}%
                  </Tag>

                  <Tag color="green">
                    {translate("proposal.approvedRepaymentPeriod")}: {getPeriodText(proposal?.approvedRepaymentPeriod)}
                  </Tag>

                  <Tag color="orange">
                    {translate("proposal.proposalPeriod")}: {getPeriodText(proposal?.proposalPeriod)}
                  </Tag>

                  <Tag color="purple">
                    {translate("proposal.proposalDate")}: {formatDate(proposal?.proposalDate)}
                  </Tag>
                </StyledSpace>
              }
              description={translate("step3.fixedRate")}
              style={{ width: "100%" }}
            />
            <BtnsWrapper>
              <Select options={signingOptions} value={selectedSignType} onChange={setSelectedSignType} />
              <Button type="primary" onClick={() => onSelectProposal(proposal)}>
                {translate("step3.select")}
              </Button>
            </BtnsWrapper>
          </StyledListItem>
        )}
      />
      <ActionsWrapper>
        <Button onClick={() => navigate("/loan-apps")}>{translate("step3.refuse")}</Button>
      </ActionsWrapper>
    </Card>
  );
};
