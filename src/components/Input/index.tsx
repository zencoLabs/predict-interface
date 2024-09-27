import { forwardRef, type ComponentProps } from "react";
import cx from "clsx";
import "./index.css";
export * from "./Suffix/Max";

export type Props = ComponentProps<"input"> & {
  wrapperClassName?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      wrapperClassName,
      className,
      disabled,
      placeholder = " ",
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cx("input-wrapper", wrapperClassName)} onClick={onClick}>
        <input
          ref={ref}
          className={cx(
            "input text-16px lh-24px font-600",
            className,
            disabled ? "text-#746F6F" : "text-#FFF"
          )}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />
        {children}
      </div>
    );
  }
);

export default Input;
