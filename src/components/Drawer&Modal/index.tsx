import { isMobile } from "@utils/is";
import { Drawer as _Drawer } from './Drawer';
import { Modal } from './Modal';
import { ComponentProps } from "react";

export const Drawer: React.FC<ComponentProps<typeof _Drawer>> = (props) => {
  const Wrapper = isMobile ? _Drawer : Modal;
  return <Wrapper {...props} />
}