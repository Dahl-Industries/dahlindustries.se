import {
  EASE,
  MASK_SCALE_EASE,
  MAX_INSET_TOP,
  MAX_PARALLAX_PERCENT,
} from "./DraggableMask.data";
import type { InitDraggableCover } from "./DraggableMaskCover.types";

export const initDraggableCover: InitDraggableCover = (
  imageContainerRef,
  hotspotRef
) => {
  const element = imageContainerRef.current as HTMLElement;
  const image = element.firstChild as HTMLImageElement;
  const parent = element.parentElement as HTMLElement;
  const hotspot = hotspotRef.current as HTMLElement;

  let isDragging = false;
  let mouseInContainer = false;
  let startX: number;
  let targetX: number;
  let currX: number;
  let startMaskWidth: number;
  let startInsetRight: number;
  let currTop = MAX_INSET_TOP;

  const animateMask = () => {
    if (!element || !parent) {
      return;
    }

    if (
      !isDragging &&
      Math.floor(currX) === 0 &&
      Math.floor(currTop) === MAX_INSET_TOP
    ) {
      parent.style.clipPath = "";
      element.style.transform = "";
      return;
    }

    if (isDragging) {
      currX += (targetX - currX) * EASE;
    } else {
      currX -= (currX - 0) * EASE;
    }

    const currInsetTop = Math.min(Math.max(currTop, 0), MAX_INSET_TOP).toFixed(
      4
    );
    const currInsetRight = (startInsetRight - currX).toFixed(4);
    const currInsetLeft = currX.toFixed(4);
    parent.style.clipPath = `inset(${currInsetTop}px ${currInsetRight}px ${currInsetTop}px ${currInsetLeft}px)`;

    const elementTranslateX = (
      (-currX / startInsetRight) *
      MAX_PARALLAX_PERCENT
    ).toFixed(4);
    element.style.transform = `translate3d(${elementTranslateX}%, 0px, 0px)`;

    requestAnimationFrame(animateMask);
  };

  const scaleMaskUp = () => {
    if (!isDragging || Math.floor(currTop) < 0) {
      return;
    }

    currTop -= (currTop + 1) * MASK_SCALE_EASE;
    requestAnimationFrame(scaleMaskUp);
  };

  const scaleMaskDown = () => {
    if (isDragging || Math.floor(currTop) === MAX_INSET_TOP) {
      return;
    }

    currTop += (MAX_INSET_TOP + 1 - currTop) * MASK_SCALE_EASE;
    requestAnimationFrame(scaleMaskDown);
  };

  const removeWillChange = () => {
    element.style.willChange = "";
    image.style.willChange = "";
    parent.style.willChange = "";
  };

  const onMouseMove = (e: MouseEvent) => {
    const maxHorizontalVal = parent.offsetWidth - startMaskWidth;
    const minHorizontalVal = maxHorizontalVal * 0.2;

    targetX = Math.min(
      Math.max(0, e.clientX - startX),
      maxHorizontalVal - minHorizontalVal
    );
  };

  const onMouseUp = () => {
    isDragging = false;

    image.style.transform = "";
    requestAnimationFrame(scaleMaskDown);

    if (!mouseInContainer) {
      removeWillChange();
    }

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("contextmenu", onMouseUp);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    startMaskWidth = 100 + ((parent.offsetWidth - 275) / 12) * 5;
    startInsetRight = parent.offsetWidth - startMaskWidth;

    const currInsetTop = currTop.toFixed(4);
    const currInsetRight = startInsetRight.toFixed(4);

    parent.style.clipPath = `inset(${currInsetTop}px ${currInsetRight}px ${currInsetTop}px 0px)`;
    image.style.transform = `scale3d(1.1, 1.1, 1.1)`;

    isDragging = true;
    startX = e.clientX;
    targetX = 0;
    currX = 0;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("contextmenu", onMouseUp);
    window.addEventListener("mouseup", onMouseUp);
    requestAnimationFrame(scaleMaskUp);
    requestAnimationFrame(animateMask);
  };

  const onMouseEnter = () => {
    mouseInContainer = true;
    element.style.willChange = "transform";
    image.style.willChange = "transform";
    parent.style.willChange = "clip-path";
  };

  const onMouseLeave = () => {
    mouseInContainer = false;

    if (!isDragging) {
      removeWillChange();
    }
  };

  hotspot.addEventListener("mousedown", onMouseDown);
  hotspot.addEventListener("mouseenter", onMouseEnter);
  hotspot.addEventListener("mouseleave", onMouseLeave);
};

