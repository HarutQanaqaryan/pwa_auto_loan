import React, { ReactNode } from "react";

import { Responses404 } from "@common/ui-kit";

import { PageWrapper } from "../PageWrapper";

interface NotFoundPageProps {
  title: string;
  actions?: ReactNode;
}

export const NotFoundPage = ({ title, actions }: NotFoundPageProps) => {
  return (
    <PageWrapper>
      <Responses404 title={title} description=" " actions={actions} />
    </PageWrapper>
  );
};
