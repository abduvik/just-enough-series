import classes from "./CheckBoxField.module.scss";

type CheckBoxFieldProps = {
  label?: string;
  name?: string;
  className?: string;
  onInput?: (value: boolean) => void;
  value?: boolean;
};

export const CheckBoxField = ({
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
        onChange={(event) => onInput(event.target.value === "on")}
      />
      {label ? (
        <label className="ml-1" htmlFor={name}>
          Done
        </label>
      ) : null}
    </div>
  );
};
