import { Header } from "../Header/Header";
import classes from "./PageLayout.module.scss";

export const PageLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <div className={classes.PageLayout + " ml-auto mr-auto"}>{children}</div>
    </>
  );
};
