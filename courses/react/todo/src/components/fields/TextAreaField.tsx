export const TextAreaField = ({ value, onInput }: any) => {
  return (
    <div>
      <label htmlFor="description">Description</label>
      <textarea name="description" value={value} onChange={onInput} />
    </div>
  );
};
