import { Form, Button } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { LoanParamsForm } from "./LoanParamsForm";
import { useTranslate } from "@common/hooks";
import { useMainContext } from "../../../../contexts";
import { ActionsWrapper } from "../../../ActionsWrapper";

interface LoanParamsType {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  disabledForm: boolean;
}
export const LoanParams: FC<LoanParamsType> = ({ setCurrentStep, disabledForm }) => {
  const { translate } = useTranslate();
  const [form] = Form.useForm();
  const { currentLoan, onSaveLoanParams } = useMainContext();

  useEffect(() => {
    form.setFieldsValue(currentLoan?.data?.loanParams);
  }, [form, currentLoan?.data?.loanParams]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={() => {
        onSaveLoanParams({ loanParams: form.getFieldsValue() });
        setCurrentStep(2);
      }}
      name="loanParams"
      disabled={disabledForm}
    >
      <LoanParamsForm form={form} />
      <ActionsWrapper>
        <Button type="primary" htmlType="submit" disabled={false}>
          {translate("common.next")}
        </Button>
      </ActionsWrapper>
    </Form>
  );
};
