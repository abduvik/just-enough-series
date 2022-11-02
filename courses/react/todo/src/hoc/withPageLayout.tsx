import { PageLayout } from "../partials/PageLayout/PageLayout";
import { ReactElement } from "react";

export const withPageLayout = (Component: any) => {
  return () => (
    <PageLayout>
      <Component />
    </PageLayout>
  );
};
