import React from "react";

type IDependencyContainer = {
  _dependencies: {
    [key: symbol]: object;
  };
  add: (key: symbol, dependency: object) => void;
  get: <T>(key: symbol) => T;
};

type DependencyInjector = (
  dependencies: { [key: string]: symbol },
  Component: React.ElementType
) => any;

export type ResolveDependencies = {
  [key: string]: object;
};
