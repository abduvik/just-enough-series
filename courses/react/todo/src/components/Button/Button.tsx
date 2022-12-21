import classes from "./Button.module.scss";
import { memo, ReactNode, useMemo } from "react";

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  transparent?: boolean;
};

export const Button = memo(
  ({
    children,
    onClick,
    type = "button",
    className = "",
    ...props
  }: ButtonProps) => {
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
    }, [props.primary, props.secondary, props.transparent, className]);

    return (
      <button type={type} className={classNames} onClick={onClick}>
        {children}
      </button>
    );
  }
);
