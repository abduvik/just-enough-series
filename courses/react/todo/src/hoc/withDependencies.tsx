import { container } from "../dependencies";
import { DependencyInjector } from "../types";

export const withDependencies: DependencyInjector = (
  dependencies,
  Component
) => {
  const resolvedDependencies: any = {};
  Object.keys(dependencies).forEach((prop) => {
    const dependencyKey = Object.getOwnPropertyDescriptor(dependencies, prop);

    if (dependencyKey) {
      resolvedDependencies[prop] = container.get(dependencyKey.value);

      // Object.defineProperty(resolvedDependencies, prop, {
      //   value: container.get(dependencyKey.value),
      // });
    } else {
      throw new Error(`Dependency ${prop} not found`);
    }
  });

  return (props: any) => <Component {...resolvedDependencies} {...props} />;
};
