import { NavLink } from "react-router-dom";
import classes from "./HeaderLink.module.scss";

export const HeaderLink = ({ children, to }: any) => {
  return (
    <NavLink className={classes.HeaderLink + " ml-2 mr-2"} to={to}>
      {children}
    </NavLink>
  );
};
