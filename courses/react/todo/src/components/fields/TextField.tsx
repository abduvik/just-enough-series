export const TextField = ({ value, onInput }: any) => {
  return (
    <div>
      <label htmlFor="task">Task</label>
      <input name="task" value={value} type="text" onChange={onInput} />
    </div>
  );
};
