import { NavLink } from "react-router-dom";
import classes from "./HeaderLink.module.scss";
import { ReactNode } from "react";

type HeaderLinkProps = {
  to: string;
  children: ReactNode;
};

export const HeaderLink = ({ children, to }: HeaderLinkProps) => {
  return (
    <NavLink className={classes.HeaderLink + " ml-2 mr-2"} to={to}>
      {children}
    </NavLink>
  );
};
