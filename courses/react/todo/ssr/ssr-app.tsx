import { StaticRouter } from "react-router-dom/server";
import * as React from "react";
import { AppStateProvider } from "../src/store/app.store";
import { App } from "../src/App";

function SsrApp(location: string) {
  return () => {
    return (
      <AppStateProvider>
        <StaticRouter location={location}>
          <App />
        </StaticRouter>
      </AppStateProvider>
    );
  };
}

export { SsrApp };
