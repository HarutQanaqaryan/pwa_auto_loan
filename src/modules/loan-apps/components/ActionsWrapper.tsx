import { ReactNode, Children } from "react";

import styled from "styled-components";

const StyledActions = styled.div<{ $childCount: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: ${({ $childCount }) => ($childCount > 1 ? "space-between" : "flex-end")};
  box-shadow: 0 2px 8px rgba(0, 0, 0 / 10%);
`;

export const ActionsWrapper = ({ children }: { children: ReactNode }) => {
  const childCount = Children.count(children);
  return <StyledActions $childCount={childCount}>{children}</StyledActions>;
};
