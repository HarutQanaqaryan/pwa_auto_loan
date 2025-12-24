import { Form, Button, notification, Spin } from "antd";
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { EmploymentIncomeForm } from "./EmploymentIncomeForm";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@common/hooks";
import { useAuthContext } from "@common/auth";
import { usePostApplication, useRunLoanBp } from "../../../../hooks";
import { CreditApplicationStatusType, useMainContext } from "../../../../contexts";
import { ActionsWrapper } from "../../../ActionsWrapper";

interface EmploymentIncomeType {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  disabledForm: boolean;
}

export const EmploymentIncome: FC<EmploymentIncomeType> = ({ setCurrentStep, disabledForm }) => {
  const { isLoading, mutate } = usePostApplication();
  const { translate } = useTranslate();
  const [form] = Form.useForm();
  const { currentLoan, onSaveLoanParams } = useMainContext();
  const { profile } = useAuthContext();
  const navigate = useNavigate();
  const { runLoanBp } = useRunLoanBp();

  const startBp = useCallback(
    (data: unknown) => {
      if (data) {
        const applicationId = JSON.parse(data as string)?.applicationId;
        runLoanBp(
          {
            bpmnProcessId: "auto-loan",
            variables: {
              appId: applicationId,
            },
          },
          {
            onSuccess: () => {
              notification.success({ message: translate("application_sent") });
              navigate("/loan-apps");
            },
            onError: () => notification.error({ message: translate("failed_start_bp") }),
          },
        );
      }
    },
    [navigate, runLoanBp, translate],
  );

  const sendLoanApplication = useCallback(() => {
    const loanParams = {
      ...currentLoan?.data,
      employmentIncome: form.getFieldsValue(),
      status: CreditApplicationStatusType.SUBMITTED,
    };

    const requestObject = {
      data: loanParams,
      userId: profile?.userId || "",
      applicationId: crypto.randomUUID(),
    };
    mutate(requestObject, {
      onSuccess: startBp,
      onError: () => notification.error({ message: translate("failed_start_bp") }),
    });
  }, [mutate, profile?.userId, currentLoan, form, startBp, translate]);

  useEffect(() => {
    form.setFieldsValue(currentLoan?.data?.employmentIncome);
  }, [form, currentLoan?.data?.employmentIncome]);

  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={sendLoanApplication}
        name="employmentIncome"
        disabled={disabledForm}
      >
        <EmploymentIncomeForm />
        <ActionsWrapper>
          <Button
            onClick={() => {
              onSaveLoanParams({ employmentIncome: form.getFieldsValue() });
              setCurrentStep(2);
            }}
            disabled={false}
          >
            {translate("common.back")}
          </Button>
          {!disabledForm ? (
            <Button type="primary" htmlType="submit" disabled={false}>
              {translate("loanApps.request.button.submit")}
            </Button>
          ) : (
            <Button type="primary" disabled={false} onClick={() => navigate("/loan-apps")}>
              {translate("common.notFoundPage.button.back")}
            </Button>
          )}
        </ActionsWrapper>
      </Form>
    </Spin>
  );
};
