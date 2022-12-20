import { Routes } from "react-router-dom";
import { Route } from "react-router";
import React from "react";
import { PageLayout } from "./partials/PageLayout/PageLayout";
import { AppStateProvider } from "./store/app.store";
import "./styles/general.scss";
import { withSuspense } from "./hoc/withSuspense";

const SuspenseTodoContainer = withSuspense(
  () => import("./containers/TodoContainer")
);

const SuspenseTodoStatsContainer = withSuspense(
  () => import("./containers/TodoStatsContainer")
);

const SuspenseAboutContainer = withSuspense(
  () => import("./containers/AboutContainer")
);

function App() {
  return (
    <AppStateProvider>
      <PageLayout>
        <Routes>
          <Route path="/" element={SuspenseTodoContainer} />
          <Route path="/stats" element={SuspenseTodoStatsContainer} />
          <Route path="/about" element={SuspenseAboutContainer} />
        </Routes>
      </PageLayout>
    </AppStateProvider>
  );
}

export { App };
