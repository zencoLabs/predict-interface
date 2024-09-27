import clsx from "clsx";

export const Card: React.FC<React.PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("rounded-16px p-16px bg-gray-90", className)}>
      {children}
    </div>
  );
};
