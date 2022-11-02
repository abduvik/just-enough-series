import { createElement } from "react";

export const Title = ({ children, level }: any) => {
  const Component = `h${level}`;
  return createElement(Component, {}, children);
};
