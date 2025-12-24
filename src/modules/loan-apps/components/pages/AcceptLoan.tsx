import { Card, Typography, Button, Descriptions } from "antd";
import { EventType, useMainContext } from "../../contexts";
import { ActionsWrapper } from "../ActionsWrapper";
import { useTranslate } from "@common/hooks";
import { useNavigate } from "react-router-dom";
import { usePostEvent } from "../../hooks";
import { ProposalType } from "modules/loan-apps/types";

const { Title } = Typography;

export const AcceptLoan = () => {
  const { translate, formatNumber } = useTranslate();
  const { currentLoan } = useMainContext();
  const navigate = useNavigate();
  const { postEvent } = usePostEvent();

  const proposal = {} as ProposalType;

  const onSendDecision = () => {
    if (!currentLoan?.applicationId) {
      return;
    }
    postEvent(
      {
        id: currentLoan?.applicationId,
        type: EventType.USER_ACCEPT2,
        result: "OK",
      },
      {
        onSuccess: () => navigate("/loan-apps"),
      },
    );
  };

  return (
    <Card title={translate("step7.title")}>
      <Title level={5} style={{ marginBottom: 24 }}>
        {translate("step7.review")}
      </Title>

      <Descriptions bordered column={1} style={{ marginBottom: 24 }}>
        <Descriptions.Item label={translate("step7.loanAmount")}>
          {formatNumber(proposal?.approvedSum || 0)} ₽
        </Descriptions.Item>
        <Descriptions.Item label={translate("step7.interestRate")}>
          {proposal?.approvedInterestRate ?? 0} %
        </Descriptions.Item>
        <Descriptions.Item label={translate("step7.term")}>
          {proposal?.proposalPeriod ?? 0} {translate("step7.term").toLowerCase().includes("term") ? "months" : "мес."}
        </Descriptions.Item>
      </Descriptions>

      <ActionsWrapper>
        <Button type="primary" onClick={onSendDecision}>
          {translate("step7.accept")}
        </Button>
      </ActionsWrapper>
    </Card>
  );
};
