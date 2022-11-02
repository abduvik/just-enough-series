import classes from "./TextAreaField.module.scss";

export const TextAreaField = ({
  value,
  onInput,
  label = "",
  name = "",
  className,
}: any) => {
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
};
