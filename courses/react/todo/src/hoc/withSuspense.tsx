import React, { Suspense } from "react";

export const withSuspense = (importMethod: any) => {
  const LazyComponent = React.lazy(importMethod);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};
