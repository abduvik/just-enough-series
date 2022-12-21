import { createElement, memo, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  level: number;
};

export const Title = memo(({ children, level }: TitleProps) => {
  const Component = `h${level}`;
  return createElement(Component, {}, children);
});
