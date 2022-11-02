import { Outlet, RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { withSuspense } from "./hoc/withSuspense";
import { PageLayout } from "./partials/PageLayout/PageLayout";

const RouterConfig: RouteObject[] = [
  {
    path: "/",
    element: (
      <PageLayout>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "/",
        element: withSuspense(() => import("./containers/TodoContainer")),
      },
      {
        path: "/stats",
        element: withSuspense(() => import("./containers/TodoStatsContainer")),
      },
      {
        path: "/about",
        element: withSuspense(() => import("./containers/AboutContainer")),
      },
    ],
  },
];

export const Router = createBrowserRouter(RouterConfig);
