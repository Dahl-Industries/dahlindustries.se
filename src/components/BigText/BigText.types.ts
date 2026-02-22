import type { RefObject } from "react";

export type BigTextProps = {
  text: string;
  className?: string;
  isStatic?: boolean;
  animationDelay?: number;
  animateIntoView?: boolean;
  snapOnAnimationEnd?: () => void;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
  withoutSrText?: boolean;
  srText?: string;
};

export type InitCharsAnimation = {
  containerRef: RefObject<HTMLSpanElement>;
  staticReset: () => void;
  animationDelay?: number;
  animateIntoView?: boolean;
  snapOnAnimationEnd?: () => void;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
};
