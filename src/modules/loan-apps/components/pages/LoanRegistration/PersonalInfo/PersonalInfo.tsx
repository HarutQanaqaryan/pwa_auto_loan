import { Form, Button } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { PersonalInfoForm } from "./PersonalInfoForm";
import dayjs from "dayjs";
import { useTranslate } from "@common/hooks";
import { useMainContext } from "../../../../contexts";
import { ActionsWrapper } from "../../../ActionsWrapper";

interface PersonalInfoType {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  disabledForm: boolean;
}

export const PersonalInfo: FC<PersonalInfoType> = ({ setCurrentStep, disabledForm }) => {
  const { translate } = useTranslate();
  const [form] = Form.useForm();
  const { currentLoan, onSaveLoanParams } = useMainContext();

  useEffect(() => {
    const birthDate = currentLoan?.data?.personalInfo?.birthDate;
    const formData = {
      ...currentLoan?.data?.personalInfo,
      birthDate: birthDate ? dayjs(currentLoan?.data?.personalInfo?.birthDate) : void 0,
    };
    form.setFieldsValue(formData);
  }, [form, currentLoan?.data?.personalInfo]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={() => {
        onSaveLoanParams({ personalInfo: form.getFieldsValue() });
        setCurrentStep(3);
      }}
      name="personalInfo"
      disabled={disabledForm}
    >
      <PersonalInfoForm form={form} />
      <ActionsWrapper>
        <Button
          onClick={() => {
            onSaveLoanParams({ personalInfo: form.getFieldsValue() });
            setCurrentStep(1);
          }}
          disabled={false}
        >
          {translate("common.back")}
        </Button>
        <Button type="primary" htmlType="submit" disabled={false}>
          {translate("common.next")}
        </Button>
      </ActionsWrapper>
    </Form>
  );
};
