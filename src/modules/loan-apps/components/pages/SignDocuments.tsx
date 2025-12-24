import { useState } from "react";
import { Card, List, Input, Button, Typography, Alert, notification } from "antd";
import { FileTextOutlined, EditOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { ActionsWrapper } from "../ActionsWrapper";
import { useTranslate } from "@common/hooks";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../../contexts";

const { Title } = Typography;

export const SignDocuments = () => {
  const { translate } = useTranslate();
  const intl = useIntl();
  const [signature, setSignature] = useState("");
  const navigate = useNavigate();
  const { currentLoan } = useMainContext();

  const documents =
    intl.locale === "ru"
      ? ["Договор кредита", "Договор купли-продажи автомобиля", "Страховой полис", "Уведомление о конфиденциальности"]
      : ["Loan Agreement", "Car Purchase Agreement", "Insurance Policy", "Privacy Notice"];

  const handleSign = () => {
    notification.success({ message: translate("loan_success_processed") });
    navigate("/loan-apps");
  };

  return (
    <Card title={translate("step8.title")}>
      <Title level={5} style={{ marginBottom: 24 }}>
        {translate("step8.documents")}
      </Title>

      <List
        dataSource={documents}
        renderItem={(doc) => (
          <List.Item>
            <List.Item.Meta
              avatar={<FileTextOutlined />}
              title={doc}
              description={intl.formatMessage({
                id: "step8.documentDescription",
              })}
            />
            <Button type="link" icon={<EditOutlined />}>
              {translate("common.view")}
            </Button>
          </List.Item>
        )}
        style={{ marginBottom: 24 }}
      />

      <Alert message={translate("step8.reviewAlert")} type="warning" showIcon style={{ marginBottom: 24 }} />

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
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/loan-apps/accept-loan/${currentLoan?.applicationId}`)}
        >
          {translate("common.back")}
        </Button>
        <Button type="primary" size="large" onClick={handleSign} disabled={!signature.trim() || !signature}>
          {signature ? translate("step8.signed") : translate("step8.signButton")}
        </Button>
      </ActionsWrapper>
    </Card>
  );
};
