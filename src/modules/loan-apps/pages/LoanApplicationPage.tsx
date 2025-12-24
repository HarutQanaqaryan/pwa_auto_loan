import React from "react";

import { useTranslate } from "@common/hooks";

import { Layout, Card, Typography } from "antd";

import styled from "styled-components";
import { LoanApplicationRoutes } from "../components/LoanAppsRoutes";

const { Content } = Layout;
const { Title } = Typography;

const StyledContent = styled(Content)`
  margin-bottom: 50px;

  @media (width >= 768px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledCard = styled(Card)`
  @media (width >= 768px) {
    width: 80%;
  }
`;

export const LoanApplicationPage: React.FC = () => {
  const { translate } = useTranslate();

  return (
    <Layout>
      <StyledContent>
        <StyledCard>
          <Title level={3} style={{ marginBottom: 24 }}>
            {translate("application.title")}
          </Title>
          <LoanApplicationRoutes />
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};
