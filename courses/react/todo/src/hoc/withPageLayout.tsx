import { ElementType } from "react";
import { PageLayout } from "../components/PageLayout/PageLayout";

export const withPageLayout = (Component: ElementType) => {
  return () => (
    <PageLayout>
      <Component />
    </PageLayout>
  );
};
