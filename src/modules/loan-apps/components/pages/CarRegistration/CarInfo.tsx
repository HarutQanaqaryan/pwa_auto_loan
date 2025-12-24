import { Card, Form, Input, Button, notification, Spin } from "antd";
import { useEffect } from "react";
import { useTranslate } from "@common/hooks";
import { useFormRules, usePostEvent, useSendCarInfo } from "../../../hooks";
import { CarInfoDataType, EventType, useMainContext } from "../../../contexts";
import { ActionsWrapper } from "../../ActionsWrapper";
import { useNavigate } from "react-router-dom";

export const CarInfo = () => {
  const { translate } = useTranslate();
  const [form] = Form.useForm();
  const { currentLoan: loanParams } = useMainContext();
  const { isLoading, mutate } = useSendCarInfo();
  const navigate = useNavigate();
  const rules = useFormRules();
  const { postEvent } = usePostEvent();

  const carPrice = Form.useWatch("carPrice", form);

  useEffect(() => {
    if (carPrice) {
      const kaskoCost = Math.round(carPrice * 0.03);
      form.setFieldValue("kaskoCost", kaskoCost);
    }
  }, [carPrice, form]);

  useEffect(() => {
    form.setFieldsValue(loanParams?.data?.carInfo);
  }, [form, loanParams?.data?.carInfo]);

  const sendCarInfo = (params: CarInfoDataType) => {
    if (loanParams?.applicationId) {
      const applicationId = loanParams?.applicationId;
      mutate(
        { applicationId: applicationId, data: params },
        {
          onSuccess: () => {
            postEvent({ id: applicationId, type: EventType.CAR_INFO, result: "OK" });
            notification.success({ message: translate("car-info_sent") });
            navigate("/loan-apps");
          },
        },
      );
    }
  };

  return (
    <Spin spinning={isLoading}>
      <Card title={translate("step4.title")}>
        <Form form={form} layout="vertical" onFinish={sendCarInfo} name="carInfo">
          <Form.Item name="vin" label={translate("step4.vin")} rules={[rules.vinRequired()]}>
            <Input placeholder={"1HGBH41JXMN109186"} />
          </Form.Item>
          <Form.Item name="mileage" label={translate("mileage")} rules={[rules.numberRange(0, 999999)]}>
            <Input type={"number"} />
          </Form.Item>
          <Form.Item
            name="carPrice"
            label={translate("car_price")}
            rules={[rules.numberRange(0, 13000000, void 0, "maxNumber")]}
          >
            <Input type={"number"} />
          </Form.Item>
          <Form.Item name="kaskoCost" label={translate("kasko_cost")}>
            <Input type={"number"} disabled />
          </Form.Item>
          <ActionsWrapper>
            <Button type="primary" htmlType="submit">
              {translate("loanApps.request.button.submit")}
            </Button>
          </ActionsWrapper>
        </Form>
      </Card>
    </Spin>
  );
};
