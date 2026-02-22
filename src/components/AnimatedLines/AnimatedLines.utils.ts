import { ANIMATION_DELAY_STEPS } from "./AnimatedLines.data";
import type { InitLinesAnimation } from "./AnimatedLines.types";

export const initLinesAnimation: InitLinesAnimation = ({
  containerRef,
  staticReset,
  animationDelay = 0,
  animateIntoView,
  intersectionThreshold = 0.2,
  intersectionRootMargin,
}) => {
  const containerEl = containerRef.current as HTMLElement;
  const mainSpans = [...containerEl.children];
  const targetContainer = mainSpans.pop() as HTMLSpanElement;

  let currTop: number;
  let currLine: HTMLSpanElement;
  let lineIndex = 0;

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        canCleanUpAnimations();
      }
    });
  };

  const observer = new IntersectionObserver(intersectionObserverCallback);

  const canCleanUpAnimations = () => {
    window.removeEventListener("resize", canCleanUpAnimations);
    observer.unobserve(containerEl);
    staticReset();
  };

  const animateSpans = () => {
    mainSpans.forEach((span, index) => {
      const mainSpan = span as HTMLSpanElement;
      const top = mainSpan.offsetTop;

      if (currTop !== top) {
        const height = mainSpan.offsetHeight;
        currTop = top;
        currLine = document.createElement("span");
        currLine.style.top = `${top}px`;
        currLine.style.height = `${height}px`;
        lineIndex++;
        targetContainer.appendChild(currLine);
      }

      const targetSpan = document.createElement("span");
      targetSpan.innerHTML = mainSpan.innerHTML;
      targetSpan.style.left = `${mainSpan.offsetLeft}px`;
      targetSpan.style.animationDelay = `${
        animationDelay + lineIndex * ANIMATION_DELAY_STEPS
      }s`;

      if (index === mainSpans.length - 1) {
        targetSpan.onanimationend = () => {
          observer.observe(containerEl);
          window.addEventListener("resize", canCleanUpAnimations);
        };
      }

      currLine.appendChild(targetSpan);
    });
  };

  if (!animateIntoView) {
    animateSpans();
    return;
  }

  const inViewIntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSpans();
        inViewObserver.unobserve(containerEl);
      }
    });
  };

  const inViewIntersectionObserverOptions = {
    threshold: intersectionThreshold,
    rootMargin: intersectionRootMargin,
  };

  const inViewObserver = new IntersectionObserver(
    inViewIntersectionObserverCallback,
    inViewIntersectionObserverOptions
  );

  inViewObserver.observe(containerEl);
};

