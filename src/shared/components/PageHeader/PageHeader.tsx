import React, { ReactNode } from "react";

import { Typography } from "@common/ui-kit";

import { CarOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { Burger } from "../Burger";
import { MobileSidebar } from "../MobileSidebar";
/* stylelint-enable */

const StyledPageHeader = styled.header`
  padding: 12px 32px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0 / 10%);
`;

const LogoText = styled(Typography)`
  color: white !important;
  line-height: 24px;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: block;
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (width <= 768px) {
    display: none;
  }
`;

const StyledTypography = styled(Typography)`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};

  @media (width <= 768px) {
    display: none;
  }
`;

export type PageHeaderProps = {
  isSidebarOpen: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
  onLogoClick: () => void;
  title?: string;
  logo?: string;
  controls?: ReactNode;
};

export const PageHeader = ({
  isSidebarOpen,
  onSidebarOpen,
  onSidebarClose,
  onLogoClick,
  title,
  controls,
}: PageHeaderProps) => {
  return (
    <StyledPageHeader>
      <LogoContainer>
        <LogoText size="xl" onClick={onLogoClick}>
          <CarOutlined style={{ fontSize: 24, color: "#1890ff" }} />
        </LogoText>
      </LogoContainer>
      <StyledTypography size="h1" as="h3">
        {title}
      </StyledTypography>
      <StyledControls>{controls}</StyledControls>
      <Burger onClick={onSidebarOpen} />
      {isSidebarOpen && <MobileSidebar controls={controls} onClose={onSidebarClose} />}
    </StyledPageHeader>
  );
};
