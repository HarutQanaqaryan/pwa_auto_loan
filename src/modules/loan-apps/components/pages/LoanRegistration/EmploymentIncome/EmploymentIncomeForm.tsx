import { Card, Form, Input, Select } from "antd";
import { useFormRules } from "../../../../hooks";
import { isMobile } from "react-device-detect";
import { useTranslate } from "@common/hooks";

export const EmploymentIncomeForm = () => {
  const rules = useFormRules();
  const { translate } = useTranslate();
  return (
    <Card title={isMobile ? translate("step.3") : void 0}>
      <Form.Item name="employerName" label={translate("step1.employerName")} rules={[rules.valueLength(255, false)]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="employmentType"
        label={translate("step1.employmentType")}
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
              value: "official",
              label: translate("official"),
            },
            {
              value: "ip",
              label: translate("ip"),
            },
            {
              value: "selfEmployed",
              label: translate("selfEmployed"),
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="employerInn" label={translate("step1.employerInn")} rules={[rules.digitsRequired(12)]}>
        <Input type={"number"} maxLength={12} minLength={12} />
      </Form.Item>

      <Form.Item name="position" label={translate("step1.position")} rules={[rules.valueLength(100)]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="workExperience"
        label={translate("step1.workExperience")}
        rules={[rules.numberRange(0, 999, void 0, "maxNumber")]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="monthlyIncome"
        label={translate("step1.monthlyIncome")}
        rules={[rules.numberRange(0, 100000000, void 0, "maxNumber")]}
      >
        <Input type="number" />
      </Form.Item>
    </Card>
  );
};
