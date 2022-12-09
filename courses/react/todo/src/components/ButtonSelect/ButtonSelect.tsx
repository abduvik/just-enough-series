import classes from "./ButtonSelect.module.scss";

type ButtonSelectProps = {
  onSelect: (value: string) => void;
  className?: string;
  options: { label: string; value: string }[];
  value: string;
};

export const ButtonSelect = ({
  onSelect,
  className = "",
  options,
  value,
}: ButtonSelectProps) => {
  return (
    <div className={className + " " + classes.ButtonSelectWrapper}>
      {options.map((option) => (
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
