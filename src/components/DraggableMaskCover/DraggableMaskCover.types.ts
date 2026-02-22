import type { RefObject } from "react";

export type DraggableMaskCoverProps = {
  animationDelay?: number;
};

export type InitDraggableCover = (
  imageContainerRef: RefObject<HTMLDivElement>,
  hotspotRef: RefObject<HTMLDivElement>
) => void;
