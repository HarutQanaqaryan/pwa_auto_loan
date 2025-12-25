import { Card, Typography, Button, Checkbox } from "antd";
import { EventType, useMainContext } from "../../contexts";
import { ActionsWrapper } from "../ActionsWrapper";
import { useTranslate } from "@common/hooks";
import { useNavigate } from "react-router-dom";
import { usePostEvent } from "../../hooks";
import { useState } from "react";

const { Title } = Typography;

export const AcceptLoan = () => {
  const { translate } = useTranslate();
  const { currentLoan } = useMainContext();
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const { postEvent } = usePostEvent();

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
      <Checkbox value={agree} onChange={(e) => setAgree(e.target.checked)}>
        {translate("im_agree")}
      </Checkbox>
      <ActionsWrapper>
        <Button type="primary" disabled={!agree} onClick={onSendDecision}>
          {translate("step7.accept")}
        </Button>
      </ActionsWrapper>
    </Card>
  );
};
