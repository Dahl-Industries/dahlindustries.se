export enum ElementType {
  BUTTON,
  SPAN,
}

export type BigActionProps = {
  text: string;
  textTwo?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  srText?: string;
  elementType?: ElementType;
  withAreaCursor?: boolean;
  areaCursorLabel?: string;
  areaCursorClassName?: string;
  onAreaCursorExit?: () => void;
  animationDelay?: number;
  animateIntoView?: boolean;
  inverse?: boolean;
};

