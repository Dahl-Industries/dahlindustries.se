export const setBodyTextColor = (key: string) => {
  const root = document.documentElement;
  const color = getComputedStyle(root).getPropertyValue(key);
  root.style.setProperty("--main-color", color);
};

