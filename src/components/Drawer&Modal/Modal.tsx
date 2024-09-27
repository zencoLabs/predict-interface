import { type ComponentProps, type ReactNode } from "react";
import _Modal from "@cfx-kit/ui-components/dist/Modal";
import { ReactComponent as CloseIcon } from "@assets/icons/close.svg";
import "@cfx-kit/ui-components/dist/Modal.css";

interface Props extends ComponentProps<typeof _Modal> {
  title?: string;
  children?: (({ close }: { close: VoidFunction }) => JSX.Element) | ReactNode;
}

export const Modal: React.FC<Props> = ({
  children,
  title,
  closeOnOutsideClick = true,
  ...props
}) => {
  return (
    <_Modal
      {...props}
      closeOnOutsideClick={closeOnOutsideClick}
      backdropClassName="bg-black-normal opacity-70"
    >
      {({ contentProps, closeTriggerProps, close }) => (
        <div
          {...contentProps}
          className="p-24px bg-gray-90 rounded-16px min-w-480px"
        >
          <div className="flex-vertical-center justify-between mb-24px">
            <div className="text-(white-normal 20px) font-600 lh-28px">
              {title}
            </div>
            <span
              {...closeTriggerProps}
              className="text-white-normal cursor-pointer"
            >
              <CloseIcon className="pointer-events-none" />
            </span>
          </div>
          {typeof children === "function"
            ? children({
                close,
              })
            : children}
        </div>
      )}
    </_Modal>
  );
};
