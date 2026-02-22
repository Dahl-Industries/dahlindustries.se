/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = (callback: (args?: any) => any, interval: number) => {
  let enableCall = true;

  return (...args: any) => {
    if (!enableCall) {
      return;
    }

    enableCall = false;
    callback(...args);
    setTimeout(() => (enableCall = true), interval);
  };
};

