import { SCROLL_EASE, FOCUSABLE_ELEMENT_SELECTORS } from "./ProjectModal.data";
import { isMobile } from "../../utils";
import type { InitMediaScroll, TrapFocusInElement } from "./ProjectModal.types";

export const initMediaScroll: InitMediaScroll = (
  containerRef,
  mediaElementRef
) => {
  const container = containerRef.current as HTMLElement;
  const containerParent = container.parentElement as HTMLElement;
  const media = mediaElementRef.current as HTMLElement;
  let useScrollWidthRetainer: boolean;
  let screenWidth = window.innerWidth;
  let isDestroyed = false;

  const destroy = () => {
    isDestroyed = true;
  };

  if (isMobile() && window.innerWidth < 769) {
    return [destroy];
  }

  let containerParentHeight: number;
  const parentDistanceY = containerParent.getBoundingClientRect().top;
  let currX = parentDistanceY;
  let targetX = parentDistanceY;

  const reviseParentHeight = (): void => {
    const rightPadding = window.innerWidth >= 1228 ? 60 : 35;
    const parentHeight =
      container.scrollWidth -
      window.innerWidth +
      window.innerHeight +
      rightPadding;

    if (
      containerParentHeight !== parentHeight &&
      screenWidth === window.innerWidth &&
      containerParent.getBoundingClientRect().top < 0 &&
      typeof useScrollWidthRetainer === "undefined"
    ) {
      // Handle chrome calculating scrollWidth with transformX

      useScrollWidthRetainer = true;
      return;
    }

    if (containerParentHeight !== parentHeight) {
      containerParent.style.height = `${parentHeight}px`;
      containerParentHeight = parentHeight;
    }
  };

  reviseParentHeight();

  const setMediaScroll = () => {
    if (isDestroyed) {
      return;
    }

    screenWidth = window.innerWidth;
    reviseParentHeight();

    targetX = containerParent.getBoundingClientRect().top;
    currX += (targetX - currX) * SCROLL_EASE;
    const translateX = currX.toFixed(4);

    media.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,${translateX},0,0,1)`;

    if (useScrollWidthRetainer) {
      const scrollWidthRetainer = media.lastChild as HTMLElement;
      scrollWidthRetainer.style.marginLeft = `${-translateX}px`;
    }

    requestAnimationFrame(setMediaScroll);
  };

  setMediaScroll();

  return [destroy];
};

export const trapFocusInElement: TrapFocusInElement = (containerRef) => {
  const container = containerRef.current as HTMLElement;
  const focusableElements = [
    ...container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS),
  ] as HTMLElement[];

  const onTabKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (
        !focusableElements.includes(document.activeElement as HTMLElement) ||
        document.activeElement ===
          focusableElements[focusableElements.length - 1]
      ) {
        e.preventDefault();
        focusableElements[0].focus();
      }
    }
  };

  const destroy = () => {
    window.removeEventListener("keydown", onTabKeyDown);
  };

  window.addEventListener("keydown", onTabKeyDown);

  return [destroy];
};

