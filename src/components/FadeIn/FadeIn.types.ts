import type { ReactNode } from "react";

export type FadeInProps = {
  className?: string;
  animationDelay?: number;
  animateIntoView?: boolean;
  children: ReactNode;
};
