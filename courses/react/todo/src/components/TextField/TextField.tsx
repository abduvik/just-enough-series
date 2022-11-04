import classes from "./TextField.module.scss";
import { forwardRef } from "react";

export const TextField = forwardRef<HTMLInputElement, any>(
  ({ value, onInput, label = "", name = "", className }, ref?) => {
    return (
      <div className={className}>
        {!label ? null : <label htmlFor={name}>{label}</label>}
        <input
          ref={ref}
          name={name}
          value={value}
          type="text"
          className={classes.TextField}
          onChange={(event) => onInput(event.target.value)}
        />
      </div>
    );
  }
);
