import React, { type ComponentProps } from "react";
import cx from "clsx";

export const MaxSuffix: React.FC<
  ComponentProps<"span"> & { disabled?: boolean }
> = ({ className, disabled, ...props }) => {
  return (
    <span
      className={cx(
        "ml-6px inline-flex-center px-6px py-2px rounded-4px text-12px font-500 lh-20px transition-colors bg-gray-90",
        disabled
          ? "text-gray-80 pointer-events-none"
          : "text-yellow-100 cursor-pointer",
        className
      )}
      {...props}
    >
      Max
    </span>
  );
};
