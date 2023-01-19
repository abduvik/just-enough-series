import classes from "./CheckBoxField.module.scss";
import { memo } from "react";

type CheckBoxFieldProps = {
  label?: string;
  name?: string;
  className?: string;
  onInput?: (value: boolean) => void;
  value?: boolean;
};

export const CheckBoxField = memo(
  ({
    value,
    onInput = () => {},
    label,
    name = "",
    className,
  }: CheckBoxFieldProps) => {
    return (
      <div className={classes.CheckBox + " " + className}>
        <input
          name={name}
          checked={value}
          type="checkbox"
          onChange={(event) => onInput(event.target.checked)}
        />
        {label ? (
          <label className="ml-1" htmlFor={name}>
            Done
          </label>
        ) : null}
      </div>
    );
  }
);
