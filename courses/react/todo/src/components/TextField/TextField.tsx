import classes from "./TextField.module.scss";

export const TextField = ({
  value,
  onInput,
  label = "",
  name = "",
  className,
}: any) => {
  return (
    <div className={className}>
      {!label ? null : <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        value={value}
        type="text"
        className={classes.TextField}
        onChange={(event) => onInput(event.target.value)}
      />
    </div>
  );
};
