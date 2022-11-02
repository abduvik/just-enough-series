import classes from "./CheckBoxField.module.scss";

export const CheckBoxField = ({
  value,
  onInput = () => {},
  label,
  name = "",
  className,
}: any) => {
  return (
    <div className={classes.CheckBox + " " + className}>
      <input
        name={name}
        checked={!!value}
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
