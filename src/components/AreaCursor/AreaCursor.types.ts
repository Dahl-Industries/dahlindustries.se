import type { RefObject } from "react";

export enum Mode {
  CLICK,
  DRAG,
}

export type CursorPosition = {
  x: number;
  y: number;
};

export type CursorProps = {
  mode: Mode;
  initialPosition: CursorPosition;
  clicked: boolean;
  fading: boolean;
  label?: string;
  className?: string;
};

export type AreaCursorProps = {
  areaRef: RefObject<HTMLElement>;
  label?: string;
  mode?: Mode;
  className?: string;
  onCursorExit?: () => void;
};

type InitAreaCursorProps = {
  areaRef: RefObject<HTMLElement>;
  mode: Mode;
  onEnter: (position: CursorPosition) => void;
  onLeave: () => void;
  onClick: () => void;
  onDragEnd: () => void;
};

export type InitAreaCursor = (props: InitAreaCursorProps) => void;

type InitCursorProps = {
  cursorRef: RefObject<HTMLElement>;
  initialPosition: CursorPosition;
};

export type InitCursor = (props: InitCursorProps) => void;

