import React from "react";

import { IconButton, Sidebar } from "@common/ui-kit";
import { CloseIcon } from "@shared";

import styled from "styled-components";

type Props = {
  controls: React.ReactNode;
  onClose: () => void;
};

const StyledSidebar = styled(Sidebar)`
  background-color: var(--color-bg-default);
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 16px;
  padding: 12px 32px;
`;

const StyledContent = styled(Sidebar.Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 4px 32px;

  button {
    background-color: transparent;
    width: 100%;
    padding: 0 8px;
    border: 1px solid #1890ff;

    &:last-of-type {
      background-color: #1890ff;
      height: 32px;
      border-radius: 4px;
      justify-content: center;
      align-items: center;
      display: flex;
    }

    .Button-Label {
      margin-right: -14px;
      color: #1890ff;
    }
  }
`;

export const MobileSidebar = ({ controls, onClose }: Props) => {
  return (
    <StyledSidebar isOpen={true} hasOverlay={true}>
      <StyledHeader>
        <IconButton icon={CloseIcon} onClick={onClose} width="22px" height="22px" />
      </StyledHeader>
      <StyledContent>{controls}</StyledContent>
    </StyledSidebar>
  );
};
