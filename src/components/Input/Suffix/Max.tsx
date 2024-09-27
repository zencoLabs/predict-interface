import React, { type ComponentProps } from "react";
import cx from "clsx";

export const MaxSuffix: React.FC<
  ComponentProps<"span"> & { disabled?: boolean }
> = ({ className, disabled, ...props }) => {
  return (
    <span
      className={cx(
        "ml-6px inline-flex-center px-6px py-2px rounded-4px text-12px font-500 lh-20px transition-colors bg-#262525",
        disabled
          ? "text-#A3A3A3 pointer-events-none"
          : "text-#FAE62F cursor-pointer",
        className
      )}
      {...props}
    >
      Max
    </span>
  );
};
