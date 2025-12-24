import { useState } from "react";
import { Card, Typography, Checkbox, Button, Descriptions, Alert } from "antd";
import { useMainContext } from "../../contexts";
import { ActionsWrapper } from "../ActionsWrapper";
import { useTranslate } from "@common/hooks";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const AcceptLoan = () => {
  const { translate, formatNumber } = useTranslate();
  const { currentLoan } = useMainContext();
  const [agreed, setAgreed] = useState(currentLoan.data?.agree ?? false);
  const navigate = useNavigate();

  const proposal = currentLoan?.data?.selectedProposal;

  return (
    <Card title={translate("step7.title")}>
      <Title level={5} style={{ marginBottom: 24 }}>
        {translate("step7.review")}
      </Title>

      <Descriptions bordered column={1} style={{ marginBottom: 24 }}>
        <Descriptions.Item label={translate("step7.loanAmount")}>
          {formatNumber(proposal?.amount || 0)} ₽
        </Descriptions.Item>
        <Descriptions.Item label={translate("step7.interestRate")}>{proposal?.interest} %</Descriptions.Item>
        <Descriptions.Item label={translate("step7.term")}>
          {proposal?.term} {translate("step7.term").toLowerCase().includes("term") ? "months" : "месяцев"}
        </Descriptions.Item>
        <Descriptions.Item label={translate("step7.monthlyPayment")}>
          {formatNumber(proposal?.payment || 0)} ₽
        </Descriptions.Item>
        <Descriptions.Item label={translate("step7.car")}>
          Toyota Camry ({translate("step7.vin")}-{currentLoan?.data?.carInfo?.vin})
        </Descriptions.Item>
      </Descriptions>

      <Alert
        message={translate("step7.termsTitle")}
        description={translate("step7.termsDescription", { payment: proposal?.payment })}
        type="info"
        style={{ marginBottom: 24 }}
      />

      <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginBottom: 24 }}>
        {translate("step7.agree")}
      </Checkbox>

      <ActionsWrapper>
        <Button
          type="primary"
          disabled={!agreed}
          onClick={() => navigate(`/loan-apps/sign-documents/${currentLoan.applicationId}`)}
        >
          {translate("step7.accept")}
        </Button>
      </ActionsWrapper>
    </Card>
  );
};
