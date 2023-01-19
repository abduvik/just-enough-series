import React, { ComponentType, Suspense } from "react";

type ImportMethodType = () => Promise<{ default: ComponentType<any> }>;

export const withSuspense = (importMethod: ImportMethodType) => {
  const LazyComponent = React.lazy(importMethod);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};
