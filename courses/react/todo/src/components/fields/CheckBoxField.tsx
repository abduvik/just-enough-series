export const CheckBoxField = ({ value, onInput }: any) => {
  return (
    <div>
      <label htmlFor="done">Done</label>
      <input
        name="done"
        checked={value}
        type="checkbox"
        onChange={(event) => onInput(event.target.value === "on")}
      />
    </div>
  );
};
