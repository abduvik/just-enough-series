import { Routes } from "react-router-dom";
import { Route } from "react-router";
import React from "react";
import "./styles/general.scss";
import { withSuspense } from "./hoc/withSuspense";
import { Header } from "./partials/Header/Header";
import { AppStateProvider } from "./custom-hooks/useAppState";
import { PageLayout } from "./components/PageLayout/PageLayout";

const SuspenseTodoContainer = withSuspense(
  () => import("./containers/TodoContainer")
);

const SuspenseEditTodoContainer = withSuspense(
  () => import("./containers/EditTodoContainer")
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
      <Header />
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {SuspenseTodoContainer}
                {SuspenseEditTodoContainer}
              </>
            }
          />
          <Route path="/stats" element={SuspenseTodoStatsContainer} />
          <Route path="/about" element={SuspenseAboutContainer} />
        </Routes>
      </PageLayout>
    </AppStateProvider>
  );
}

export { App };
