import { ComponentPropsWithRef, ElementType } from "react";
import { useAutoFocus } from "../custom-hooks/useAutoFocus";

/**
 * @example
 * const focusRef = useAutoFocus();
 * return <TextField ref={focusRef} value={value} onInput={onInput} />
 */
export const withAutoFocus = (Component: ElementType) => {
  return (props: ComponentPropsWithRef<typeof Component>) => {
    const inputRef = useAutoFocus();
    return <Component ref={inputRef} {...props} />;
  };
};

/**
 * @example
 * <AutoFocus>
 *   {(ref: any) => (
 *       <TextField ref={ref} value={value} onInput={onInput} />
 *   )}
 * </AutoFocus>
 */
// export const AutoFocus = ({ children }: PropsWithChildren) => {
//   const Component = withAutoFocus(forwardRef((props, ref) => children(ref)));
//
//   return <Component />;
// };
