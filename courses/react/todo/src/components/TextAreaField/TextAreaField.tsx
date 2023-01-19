import classes from "./TextAreaField.module.scss";
import { memo } from "react";

type TextAreaFieldProps = {
  label: string;
  name: string;
  className?: string;
  onInput: (value: string) => void;
  value: string;
};

export const TextAreaField = memo(
  ({
    value,
    onInput,
    label = "",
    name = "",
    className,
  }: TextAreaFieldProps) => {
    return (
      <div className={className}>
        <label htmlFor={name}>{label}</label>
        <textarea
          className={classes.TextAreaField}
          name={name}
          value={value}
          onChange={(event) => onInput(event.target.value)}
        />
      </div>
    );
  }
);
