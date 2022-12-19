import { container } from "../dependencies";
import { DependencyInjector, ResolveDependencies } from "../types";
import { ComponentProps } from "react";

export const withDependencies: DependencyInjector = (
  dependencies,
  Component
) => {
  const resolvedDependencies: ResolveDependencies = {};

  Object.keys(dependencies).forEach((prop) => {
    const dependencyKey = Object.getOwnPropertyDescriptor(dependencies, prop);

    if (dependencyKey?.value) {
      Object.defineProperty(resolvedDependencies, prop, {
        value: container.get(dependencyKey.value),
        enumerable: true,
      });
    } else {
      throw new Error(`Dependency ${prop} not found`);
    }
  });

  return (props: ComponentProps<typeof Component>) => (
    <Component {...props} {...resolvedDependencies} />
  );
};
