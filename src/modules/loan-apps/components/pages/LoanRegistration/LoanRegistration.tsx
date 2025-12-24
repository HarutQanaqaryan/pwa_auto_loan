import { useMemo, useState } from "react";
import { LoanParams } from "./LoanParams";
import { PersonalInfo } from "./PersonalInfo";
import { EmploymentIncome } from "./EmploymentIncome";
import { useTranslate } from "@common/hooks";
import styled from "styled-components";
import { Steps } from "antd";
import { CreditApplicationStatusType, useMainContext } from "../../../contexts";

const StyledSteps = styled(Steps)`
  @media (width <= 768px) {
    display: none;
  }
`;

export const LoanRegistration = () => {
  const { currentLoan } = useMainContext();
  const [currentStep, setCurrentStep] = useState(1);
  const { translate } = useTranslate();

  const stepComponent = useMemo(() => {
    const disabledForm =
      currentLoan?.data?.status === CreditApplicationStatusType.SUBMITTED ||
      currentLoan?.data?.status === CreditApplicationStatusType.DRAFT;
    switch (currentStep) {
      case 1:
        return <LoanParams setCurrentStep={setCurrentStep} disabledForm={disabledForm} />;
      case 2:
        return <PersonalInfo setCurrentStep={setCurrentStep} disabledForm={disabledForm} />;
      case 3:
        return <EmploymentIncome setCurrentStep={setCurrentStep} disabledForm={disabledForm} />;
    }
  }, [currentStep, currentLoan]);

  const steps = [
    { title: translate("step.2"), index: 2 },
    { title: translate("step.1"), index: 1 },
    { title: translate("step.3"), index: 3 },
  ];

  return (
    <>
      {steps.find((el) => el.index === currentStep) ? (
        <StyledSteps current={currentStep - 1} style={{ marginBottom: 32 }} items={steps} />
      ) : (
        void 0
      )}
      {stepComponent}
    </>
  );
};
