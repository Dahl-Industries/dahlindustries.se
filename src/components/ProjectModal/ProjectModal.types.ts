import type { RefObject } from "react";

export type ProjectDetails = {
  name: string;
  link: string;
  description: string;
  client?: string;
  clientLink?: string;
  role: string;
  year: string;
  modalBg: string;
  mediaUrls: string[];
};

export type ProjectModalProps = ProjectDetails & {
  onClose: () => void;
};

export type InitMediaScroll = (
  containerRef: RefObject<HTMLDivElement>,
  mediaElementRef: RefObject<HTMLDivElement>
) => Array<() => void>;

export type TrapFocusInElement = (
  containerRef: RefObject<HTMLElement>
) => Array<() => void>;
