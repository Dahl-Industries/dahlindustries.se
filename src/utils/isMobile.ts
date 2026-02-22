export const isMobile = (): boolean => {
  return (
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
  );
};

export const isIOS = (): boolean => {
  return (
    /iPhone/i.test(navigator.userAgent) ||
    (/Safari/i.test(navigator.userAgent) && navigator.maxTouchPoints > 0)
  );
};

