import { ReactElement } from "react";

export const withSideDrawer = (content: ReactElement) => {
  return () => <div>{content}</div>;
}