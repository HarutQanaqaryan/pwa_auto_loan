import { Card, Checkbox, Col, DatePicker, Form, Input, Row } from "antd";
import { useFormRules } from "../../../../hooks";
import { isMobile } from "react-device-detect";
import type { FormInstance } from "antd/lib";
import { type FC } from "react";
import { registrationAddressValidator } from "./utils";
import { useTranslate } from "@common/hooks";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

const dateFormat = "DD.MM.YYYY";

interface PersonalInfoType {
  form: FormInstance;
}

export const PersonalInfoForm: FC<PersonalInfoType> = ({ form }) => {
  const rules = useFormRules();
  const { translate } = useTranslate();

  return (
    <Card title={isMobile ? translate("step.1") : void 0}>
      <Row gutter={16}>
        <Col span={isMobile ? 24 : 12}>
          <Form.Item name="firstName" label={translate("step1.firstName")} rules={[rules.russianRequired()]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Form.Item name="lastName" label={translate("step1.lastName")} rules={[rules.russianRequired()]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Form.Item name="middleName" label={translate("step1.middleName")} rules={[rules.russianOptional()]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="passportSeries" label={translate("step1.passportSeries")} rules={[rules.digitsRequired(4)]}>
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="passportNumber" label={translate("step1.passportNumber")} rules={[rules.digitsRequired(6)]}>
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="inn" label={translate("step1.inn")} rules={[rules.digitsRequired(12)]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="birthDate"
        label={translate("step1.birthDate")}
        rules={[
          {
            required: true,
            message: translate("common.required"),
          },
        ]}
      >
        <DatePicker
          style={{ width: "100%" }}
          format={{
            format: dateFormat,
            type: "mask",
          }}
          placeholder="дд.мм.гггг"
        />
      </Form.Item>
      <Form.Item name="phone" label={translate("step1.phone")} rules={[rules.phoneRequired()]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label={translate("step1.email")} rules={[rules.emailRequired()]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="registrationAddress"
        label={translate("step1.registrationAddress")}
        rules={[rules.valueLength(255)]}
      >
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={isMobile ? 24 : 14}>
          <Form.Item
            name="residenceAddress"
            label={translate("step1.residenceAddress")}
            rules={[rules.valueLength(255)]}
            dependencies={["residenceAddress"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={translate("matches_the_residential_address")}
            name="isRegistrationAddress"
            valuePropName="checked"
            dependencies={["registrationAddress", "residenceAddress"]}
            rules={[
              {
                validator: () => registrationAddressValidator(form),
              },
            ]}
          >
            <Checkbox
              onChange={(e) => {
                const isChecked = e.target.checked;

                if (isChecked) {
                  const registrationAddress = form.getFieldValue("registrationAddress");
                  form.setFieldsValue({
                    residenceAddress: registrationAddress,
                    isRegistrationAddress: true,
                  });
                } else {
                  form.setFieldsValue({
                    residenceAddress: "",
                    isRegistrationAddress: false,
                  });
                }
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};
