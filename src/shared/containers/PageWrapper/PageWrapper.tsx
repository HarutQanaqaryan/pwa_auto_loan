import styled from "styled-components";

import { PageContent } from "../PageContent";
import { PageHeaderContainer } from "../PageHeaderContainer";

export interface PageWrapperProps extends React.PropsWithChildren {
  title?: string;
}

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bgDefault};
  min-height: 100vh;
  max-width: 100vw;
`;

export const PageWrapper = ({ title, children }: PageWrapperProps) => {
  return (
    <StyledPageWrapper>
      <PageHeaderContainer title={title} />
      <PageContent>{children}</PageContent>
    </StyledPageWrapper>
  );
};
