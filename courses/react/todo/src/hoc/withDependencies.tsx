import { container } from "../dependencies";
import { DependencyInjector } from "../types";

export const withDependencies: DependencyInjector = (
  dependencies,
  Component
) => {
  const resolvedDependencies: any = {};
  Object.keys(dependencies).forEach((prop) => {
    const dependencyKey = dependencies[prop];
    resolvedDependencies[prop] = container.get(dependencyKey);
  });

  return (props: any) => <Component {...resolvedDependencies} {...props} />;
};
