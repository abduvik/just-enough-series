import { container } from "../dependencies";

export const withDependencies = (dependencies, Component) => {
  const resolvedDependencies: any = {};
  Object.keys(dependencies).forEach((prop) => {
    const dependencyKey = dependencies[prop];
    resolvedDependencies[prop] = container.get(dependencyKey);
  })
  return <Component {...resolvedDependencies} />;
}