import type { RefObject } from "react";

export enum Size {
  LG = "lg",
}

export enum ElementType {
  PARAGRAPH,
  HEADING,
  SPAN,
}

export type AnimatedLinesProps = {
  text: string;
  className?: string;
  animationDelay?: number;
  size?: Size;
  animateIntoView?: boolean;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
  elementType?: ElementType;
  noTextTransform?: boolean;
};

type InitLinesAnimationProps = {
  containerRef: RefObject<HTMLElement>;
  staticReset: () => void;
  animationDelay?: number;
  animateIntoView?: boolean;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
};

export type InitLinesAnimation = (props: InitLinesAnimationProps) => void;

