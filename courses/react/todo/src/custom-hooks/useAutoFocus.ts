import { useEffect, useRef } from "react";

/**
 * @example
 * const AddTodoItemTextField = withAutoFocus(TextField);
 */
export const useAutoFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return inputRef;
};
