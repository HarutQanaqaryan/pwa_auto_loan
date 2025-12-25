import { useState } from "react";
import { Card, Input, Button, Typography, notification } from "antd";
import { ActionsWrapper } from "../ActionsWrapper";
import { useTranslate } from "@common/hooks";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const SignDocuments = () => {
  const { translate } = useTranslate();
  const [signature, setSignature] = useState("");
  const navigate = useNavigate();

  const handleSign = () => {
    notification.success({ message: translate("loan_success_processed") });
    navigate("/loan-apps");
  };

  return (
    <Card title={translate("step8.title")}>
      <div style={{ marginBottom: 24 }}>
        <Title level={5}>{translate("step8.electronicSignature")}</Title>
        <Input
          placeholder={translate("step8.signPlaceholder")}
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          size="large"
        />
      </div>

      <ActionsWrapper>
        <Button type="primary" size="large" onClick={handleSign} disabled={!signature.trim() || !signature}>
          {signature ? translate("step8.signed") : translate("step8.signButton")}
        </Button>
      </ActionsWrapper>
    </Card>
  );
};
