import classes from "./Button.module.scss";
import { useMemo } from "react";

export const Button = ({
  children,
  onClick,
  className = "",
  ...props
}: any) => {
  const classNames = useMemo(() => {
    const classNames = [classes.Button, ...className.split(" ")];
    if (props.primary) {
      classNames.push(classes.Primary);
    }
    if (props.secondary) {
      classNames.push(classes.Secondary);
    }
    if (props.transparent) {
      classNames.push(classes.Transparent);
    }
    return classNames.join(" ");
  }, [props.primary, props.secondary, props.transparent]);

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
