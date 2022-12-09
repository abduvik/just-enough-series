import { Header } from "../Header/Header";
import classes from "./PageLayout.module.scss";
import { PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className={classes.PageLayout + " ml-auto mr-auto"}>{children}</div>
    </>
  );
};
