import classes from "./TextField.module.scss";
import { forwardRef, memo } from "react";

type TextFieldProps = {
  value: string;
  onInput: (value: string) => void;
  label?: string;
  name?: string;
  className?: string;
};

export const TextField = memo(
  forwardRef<HTMLInputElement, TextFieldProps>(
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
            onChange={(event) =>
              onInput((event.target as HTMLInputElement).value)
            }
          />
        </div>
      );
    }
  )
);
