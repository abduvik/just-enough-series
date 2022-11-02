import classes from "./Header.module.scss";
import { HeaderLink } from "./HeaderLink/HeaderLink";

export const Header = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.HeaderTitle}>Todo App</div>
      <nav className="m-auto">
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/stats">Stats</HeaderLink>
        <HeaderLink to="/about">About</HeaderLink>
      </nav>
    </header>
  );
};
