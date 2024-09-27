import { type ComponentProps } from "react";
import ImageLoader from "@components/ImageLoader";
import { ReactComponent as DefaultOptionLogo } from "@assets/icons/option.svg";

export const OptionLogo: React.FC<ComponentProps<"img">> = ({
  className,
  ...props
}) => {
  return (
    <ImageLoader
      className={className}
      ErrorElement={<DefaultOptionLogo className={className} />}
      {...props}
    />
  );
};
