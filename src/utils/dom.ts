let disabledSet = new Set();

export const disabledScroll = (id: number) => {
  disabledSet.add(id);
  document.body.style.overflow = "hidden";
};
export const enableScroll = (id: number, force = false) => {
  if (force) {
    disabledSet.clear();
  } else {
    disabledSet.delete(id);
  }
  if (disabledSet.size === 0) {
    document.body.style.overflow = "inherit";
  }
};
