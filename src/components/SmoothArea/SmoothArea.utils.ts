import { SCROLL_EASE } from "./SmoothArea.data";
import { isMobile } from "../../utils";
import type { InitSmooth, InitParallax, InitSticky } from "./SmoothArea.types";

let smoothScrollTransformAll = false;

export const initTabKeyNavigation = () => {
  if (isMobile()) {
    return;
  }

  let resetTransformTimeout: NodeJS.Timeout;

  const scrollActiveElementIntoView = () => {
    const activeElement = document.activeElement;

    if (!activeElement || activeElement === document.body) {
      return;
    }

    const windowHeight = window.innerHeight;
    const activeElementHeight = activeElement.clientHeight;

    const documentScrollTop = document.documentElement.scrollTop;
    const targetElementPos =
      documentScrollTop + activeElement.getBoundingClientRect().top;
    const isInView =
      documentScrollTop < targetElementPos &&
      documentScrollTop + windowHeight > targetElementPos;
    const scrollToElementBase =
      isInView &&
      documentScrollTop + windowHeight < targetElementPos + activeElementHeight;

    const targetScrollPos = scrollToElementBase
      ? targetElementPos + activeElementHeight - windowHeight
      : targetElementPos - windowHeight / 2;

    if (scrollToElementBase || !isInView) {
      smoothScrollTransformAll = true;
      window.scrollTo(0, targetScrollPos);

      clearTimeout(resetTransformTimeout);

      resetTransformTimeout = setTimeout(() => {
        smoothScrollTransformAll = false;
      }, 1000);
    }
  };

  const onTabKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      setTimeout(scrollActiveElementIntoView);
    }
  };

  window.addEventListener("keydown", onTabKeyDown);
};

export const initSmooth: InitSmooth = (elementRef, inverseElementRefs) => {
  const element = elementRef.current as HTMLElement;
  const parent = element.parentElement as HTMLElement;
  const inverseElements = inverseElementRefs
    ? inverseElementRefs.map((ref) => ref.current as HTMLElement)
    : null;
  let isDestroyed = false;

  const destroy = () => {
    isDestroyed = true;
  };

  if (isMobile()) {
    element.style.position = "static";
    return [destroy];
  }

  let outOfTransormAreaTimeout: NodeJS.Timeout;
  let shouldTransform = true;
  let parentHeight: number;

  const reviseParentHeight = (): void => {
    const currentElHeight = element.offsetHeight;

    if (parentHeight !== currentElHeight) {
      parent.style.height = `${currentElHeight}px`;
      parentHeight = currentElHeight;
    }
  };

  reviseParentHeight();

  const parentDistanceY = parent.getBoundingClientRect().top;
  let currY = parentDistanceY;
  let targetY = parentDistanceY;

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        clearTimeout(outOfTransormAreaTimeout);
        element.style.willChange = "transform";
        shouldTransform = true;
      } else {
        outOfTransormAreaTimeout = setTimeout(() => {
          element.style.willChange = "";
          shouldTransform = false;
        }, 1000);
      }
    });
  };

  const intersectionObserverOptions = { rootMargin: "500px" };

  const observer = new IntersectionObserver(
    intersectionObserverCallback,
    intersectionObserverOptions
  );

  observer.observe(parent);

  const setSmoothScroll = () => {
    if (isDestroyed) {
      return;
    }

    reviseParentHeight();

    targetY = parent.getBoundingClientRect().top;
    currY += (targetY - currY) * SCROLL_EASE;

    if (smoothScrollTransformAll || shouldTransform) {
      const translateY = currY.toFixed(4);
      element.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${translateY},0,1)`;

      if (inverseElements) {
        inverseElements.forEach((inverseElement) => {
          inverseElement.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${-translateY},0,1)`;
        });
      }
    }

    requestAnimationFrame(setSmoothScroll);
  };

  setSmoothScroll();

  return [destroy];
};

export const initParallax: InitParallax = ({
  elementRef,
  multiplier,
  ease,
  onAnimate,
  willChange = "",
}) => {
  const element = elementRef.current as HTMLElement;
  const parent = element.parentElement as HTMLElement;

  let outOfAnimationAreaTimeout: NodeJS.Timeout;
  let shouldAnimate = true;
  let isDestroyed = false;

  const destroy = () => {
    isDestroyed = true;
  };

  const getParentDistanceTarget = () =>
    (parent.getBoundingClientRect().top - window.innerHeight * 0.5) *
    multiplier;

  const parentDistanceTarget = getParentDistanceTarget();
  let curr = parentDistanceTarget;
  let target = parentDistanceTarget;

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        clearTimeout(outOfAnimationAreaTimeout);
        element.style.willChange = willChange;
        shouldAnimate = true;
      } else {
        outOfAnimationAreaTimeout = setTimeout(() => {
          element.style.willChange = "";
          shouldAnimate = false;
        }, 1000);
      }
    });
  };

  const intersectionObserverOptions = { rootMargin: "500px" };

  const observer = new IntersectionObserver(
    intersectionObserverCallback,
    intersectionObserverOptions
  );

  observer.observe(parent);

  const setParallax = () => {
    if (isDestroyed) {
      return;
    }

    target = getParentDistanceTarget();
    curr += (target - curr) * ease;

    if (shouldAnimate) {
      onAnimate(element, parseFloat(curr.toFixed(4)));
    }

    requestAnimationFrame(setParallax);
  };

  setParallax();

  return [destroy];
};

export const initSticky: InitSticky = ({
  elementRef,
  ancestorRef,
  top = 0,
}) => {
  if (isMobile()) {
    return;
  }

  const element = elementRef.current as HTMLElement;
  const parent = element.parentElement as HTMLElement;
  const ancestor = ancestorRef.current as HTMLElement;

  let shouldAnimate = true;

  element.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";

  const stickyReferenceContainer = document.createElement("div");
  stickyReferenceContainer.style.position = "absolute";
  parent.insertBefore(stickyReferenceContainer, element);

  const setSticky = () => {
    if (!shouldAnimate) {
      return;
    }

    const referenceTop = stickyReferenceContainer.getBoundingClientRect().top;
    const yVal = referenceTop - top;

    const viewableAncestorArea =
      ancestor.offsetHeight + ancestor.getBoundingClientRect().top;
    const endSticky = viewableAncestorArea < element.offsetHeight + top;

    if (!endSticky && yVal < 0) {
      const translateY = -yVal.toFixed(4);
      element.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${translateY},0,1)`;
    }

    if (yVal > 0) {
      element.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
    }

    if (endSticky) {
      const translateY = ancestor.offsetHeight - (element.offsetHeight + 0);
      element.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${translateY},0,1)`;
    }

    requestAnimationFrame(setSticky);
  };

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.style.willChange = "transform";
        shouldAnimate = true;
        requestAnimationFrame(setSticky);
      } else {
        element.style.willChange = "";
        shouldAnimate = false;
      }
    });
  };

  const intersectionObserverOptions = { rootMargin: "500px" };

  const observer = new IntersectionObserver(
    intersectionObserverCallback,
    intersectionObserverOptions
  );

  observer.observe(ancestor);
};

