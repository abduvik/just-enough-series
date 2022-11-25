import { Routes } from "react-router-dom";
import { Route } from "react-router";
import React from "react";
import { PageLayout } from "./partials/PageLayout/PageLayout";
import { AppStateProvider } from "./store/app.store";
import "./styles/general.scss";
import TodoContainer from "./containers/TodoContainer";
import TodoStatsContainer from "./containers/TodoStatsContainer";
import AboutContainer from "./containers/AboutContainer";

function App() {
  return (
    <AppStateProvider>
      <PageLayout>
        <Routes>
          <Route path="/" element={<TodoContainer />} />
          <Route path="/stats" element={<TodoStatsContainer />} />
          <Route path="/about" element={<AboutContainer />} />
        </Routes>
      </PageLayout>
    </AppStateProvider>
  );
}

export { App };
