import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ReactComponent as CloseIcon } from "@assets/icons/close.svg";
import { disabledScroll, enableScroll } from "@utils/dom";

export const Drawer: React.FC<{
  title?: string;
  onClose?: () => void;
  open?: boolean;
  trigger?: ({
    triggerProps,
  }: {
    triggerProps: Omit<HTMLAttributes<HTMLElement>, "color">;
  }) => JSX.Element;
  children?: (({ close }: { close: VoidFunction }) => JSX.Element) | ReactNode;
}> = ({ children, title, open = false, trigger, onClose }) => {
  const [visible, setVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerIdRef = useRef(Math.random());
  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };
  useEffect(() => {
    setVisible(open);
  }, [open]);
  useEffect(() => {
    if (visible) {
      disabledScroll(drawerIdRef.current);
    } else {
      enableScroll(drawerIdRef.current);
    }
    return () => {
      enableScroll(drawerIdRef.current);
    };
  }, [visible]);

  return (
    <>
      {typeof trigger === "function"
        ? trigger({
            triggerProps: {
              onClick: () => {
                setVisible(true);
              },
            },
          })
        : null}
      {visible && (
        <div className="fixed top-0 left-0 w-100vw h-100vh z-1000">
          <div
            className="w-full h-full bg-#000 opacity-70"
            onClick={handleClose}
          ></div>
          <div
            className="fixed bottom-0 left-0 w-full p-24px bg-#262525 rounded-tl-24px rounded-tr-24px overflow-hidden"
            ref={drawerRef}
          >
            <div className="flex-vertical-center justify-between mb-24px">
              <div className="text-(#FFF 20px) font-600 lh-28px">{title}</div>
              <CloseIcon
                className="text-#FFF cursor-pointer"
                onClick={handleClose}
              />
            </div>
            {typeof children === "function"
              ? children({
                  close: handleClose,
                })
              : children}
          </div>
        </div>
      )}
    </>
  );
};