import { styled } from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bgSecondary};
  border-top: ${({ theme }) => theme.borders.primary};
`;

const FormContainer = styled.div`
  flex-basis: 70%;
  overflow-y: auto;
`;

const InfoContainer = styled.div`
  flex-basis: 30%;
  height: calc(100vh - 2rem);
  position: sticky;
  top: 1rem;
  padding: 1rem;
  background-color: var(--color-bg-accent);
  border-left: ${({ theme }) => theme.borders.primary};
`;

const HeaderContaner = styled.div`
  margin-left: var(--space-4xl);
  margin-right: var(--space-4xl);
`;

const MainContent = ({ children }: { children: React.ReactNode }) => <FormContainer>{children}</FormContainer>;
const SideContent = ({ children }: { children: React.ReactNode }) => <InfoContainer>{children}</InfoContainer>;

export const PageWithSidebar = ({
  headerContent,
  mainContent,
  sideContent,
}: {
  headerContent: React.ReactNode;
  mainContent: React.ReactNode;
  sideContent: React.ReactNode;
}) => {
  return (
    <PageContainer>
      <HeaderContaner>{headerContent}</HeaderContaner>
      <ContentContainer>
        <MainContent>{mainContent}</MainContent>
        <SideContent>{sideContent}</SideContent>
      </ContentContainer>
    </PageContainer>
  );
};
