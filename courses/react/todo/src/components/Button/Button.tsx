import classes from "./Button.module.scss";
import { useMemo } from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
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
    <button type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
