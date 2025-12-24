import { Typography } from "@common/ui-kit";

import styled from "styled-components";

interface FallbackErrorProps {
  error: Error;
}

const StyledFallbackErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.error};
`;

export const FallbackError = ({ error }: FallbackErrorProps) => {
  return (
    <StyledFallbackErrorWrapper>
      <StyledTypography size="caption" as="h3">
        Runtime error
      </StyledTypography>
      <StyledTypography size="body" as="pre">
        {error.message}
      </StyledTypography>
    </StyledFallbackErrorWrapper>
  );
};
