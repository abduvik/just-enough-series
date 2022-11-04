import classes from "./ButtonSelect.module.scss";

export const ButtonSelect = ({
  children,
  onSelect,
  className = "",
  options,
  value,
  ...props
}: any) => {
  return (
    <div className={className + " " + classes.ButtonSelectWrapper}>
      {options.map((option: any) => (
        <button
          key={option.value}
          className={
            classes.ButtonSelectOption +
            " " +
            (value === option.value ? classes.Selected : "")
          }
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
