import classes from "./ButtonSelect.module.scss";

type ButtonSelectProps = {
  onInput: (value: string) => void;
  className?: string;
  options: { label: string; value: string }[];
  value: string;
};

export const ButtonSelect = ({
  onInput,
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
          onClick={() => onInput(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
