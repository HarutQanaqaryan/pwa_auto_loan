import React from "react";

import styled from "styled-components";

const StyledPageContent = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spaces.s};
  color: ${({ theme }) => theme.colors.primary};
`;

export const PageContent = ({ children }: React.PropsWithChildren) => {
  return <StyledPageContent>{children}</StyledPageContent>;
};
