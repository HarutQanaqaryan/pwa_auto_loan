import type { FC } from "react";
import { isMobile } from "react-device-detect";

import { useTranslate } from "@common/hooks";

import { Card, Col, Form, Input, InputNumber, Row, Select, Slider } from "antd";
import type { FormInstance } from "antd/lib";

import { useFormRules } from "../../../../hooks";

interface LoanParamsType {
  form: FormInstance;
}

export const LoanParamsForm: FC<LoanParamsType> = ({ form }) => {
  const rules = useFormRules();
  const { translate } = useTranslate();

  return (
    <Card title={isMobile ? translate("step.2") : void 0}>
      <Row
        gutter={16}
        style={{
          display: isMobile ? "flex" : undefined,
          flexDirection: "column",
        }}
      >
        <Col span={isMobile ? 24 : 12}>
          <Form.Item
            name="loanPurpose"
            label={translate("step1.loanPurpose")}
            rules={[
              {
                required: true,
                message: translate("common.required"),
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "newCar",
                  label: translate("step1.newCar"),
                },
                {
                  value: "usedCar",
                  label: translate("step1.usedCar"),
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Form.Item
            name="loanAmount"
            label={translate("step1.loanAmount")}
            rules={[rules.numberRange(100000, 13000000)]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="loanTerm" label={translate("step1.loanTerm")} style={{ marginBottom: 0 }}>
        <Slider min={0} max={120} step={1} />
      </Form.Item>
      <Form.Item name="loanTerm" rules={[rules.numberRange(12, 120)]}>
        <InputNumber min={0} max={120} />
      </Form.Item>
      <Form.Item
        name="downPayment"
        label={translate("step1.downPayment")}
        dependencies={["loanAmount"]}
        rules={[rules.downPayment(10, form)]}
      >
        <Input type={"number"} />
      </Form.Item>
    </Card>
  );
};
