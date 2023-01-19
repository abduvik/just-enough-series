import classes from "./PageLayout.module.scss";
import { PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={classes.PageLayout + " ml-auto mr-auto"}>{children}</div>
  );
};
