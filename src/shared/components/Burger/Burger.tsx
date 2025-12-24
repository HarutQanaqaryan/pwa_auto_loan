import React from "react";

import { IconButton } from "@common/ui-kit";
import { MenuIcon } from "@shared";

import styled from "styled-components";

type Props = {
  onClick: () => void;
};

const StyledButton = styled(IconButton)`
  @media (width > 768px) {
    display: none;
  }
`;

export const Burger = ({ onClick }: Props) => {
  return <StyledButton title={"authButtonLabel"} icon={MenuIcon} onClick={onClick} width="24px" height="24px" />;
};
