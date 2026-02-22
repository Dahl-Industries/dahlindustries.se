import type { ReactNode, RefObject } from "react";

export type SmoothAreaProps = {
  children: ReactNode;
  className?: string;
  inverseElementRefs?: RefObject<HTMLElement>[];
};

export type ParallaxImageProps = {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  scaleUpOnHover?: boolean;
  scaleUp?: boolean;
  animateIn?: boolean;
  animationDelay?: number;
  multiplier?: number;
};

export type InitSmooth = (
  elementRef: RefObject<HTMLDivElement>,
  inverseElementRefs?: RefObject<HTMLElement>[]
) => Array<() => void>;

export type InitParallax = (opts: {
  elementRef: RefObject<HTMLElement>;
  multiplier: number;
  ease: number;
  onAnimate: (el: HTMLElement, val: number) => void;
  willChange?: string;
}) => Array<() => void>;

export type InitSticky = (opts: {
  elementRef: RefObject<HTMLElement>;
  ancestorRef: RefObject<HTMLElement>;
  top?: number;
}) => void;
