import React from "react";

import { styled } from "styled-components";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  width?: string;
  height?: string;
}

const StyledButton = styled.button<{ width?: string; height: string }>`
  border: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
  }

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export const IconButton: React.FC<IconButtonProps> = ({ icon, width = "16px", height = "16px", ...props }) => (
  <StyledButton type="button" {...props} width={width} height={height}>
    <img src={icon} width={width} height={height} />
  </StyledButton>
);
