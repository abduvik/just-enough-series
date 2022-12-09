import { PageLayout } from "../partials/PageLayout/PageLayout";
import { ElementType } from "react";

export const withPageLayout = (Component: ElementType) => {
  return () => (
    <PageLayout>
      <Component />
    </PageLayout>
  );
};
