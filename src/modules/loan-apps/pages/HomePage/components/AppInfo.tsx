import { useTranslate } from "@common/hooks";
import { LoanParamsType } from "../../../contexts";
import React, { FC } from "react";
import { Tag } from "antd";
import styled from "styled-components";

const StyledTag = styled(Tag)`
  display: flex;
  gap: 5px;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
`;

interface AppInfoType {
  loan: LoanParamsType;
}

export const AppInfo: FC<AppInfoType> = ({ loan }) => {
  const { translate, formatNumber } = useTranslate();
  return (
    <StyledTag color={"grey"}>
      <span>
        {translate("step1.loanAmount")}: {formatNumber(loan?.data?.loanParams?.loanAmount ?? 0)}
      </span>
      <span>
        {translate("step7.term")}: {formatNumber(loan?.data?.loanParams?.loanTerm ?? 0)}{" "}
        {translate("step7.term").toLowerCase().includes("term") ? "months" : "месяцев"}
      </span>
    </StyledTag>
  );
};
