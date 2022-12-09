import { createElement, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  level: number;
};

export const Title = ({ children, level }: TitleProps) => {
  const Component = `h${level}`;
  return createElement(Component, {}, children);
};
