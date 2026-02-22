import { InitAreaCursor, InitCursor, Mode } from "./AreaCursor.types";

export const initAreaCursor: InitAreaCursor = ({
  areaRef,
  mode,
  onEnter,
  onLeave,
  onClick,
  onDragEnd,
}) => {
  const isDragMode = mode === Mode.DRAG;
  let isDragging = false;
  const container = areaRef.current as HTMLElement;

  const onMouseEnter = (e: MouseEvent) => {
    onEnter({ x: e.clientX, y: e.clientY });
  };

  const onMouseLeave = () => {
    if (!isDragMode || !isDragging) {
      onLeave();
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    onDragEnd();
    isDragging = false;

    const containerRect = container.getBoundingClientRect();
    const containerAreaXMin = containerRect.x;
    const containerAreaXMax = containerRect.x + containerRect.width;
    const containerAreaYMin = containerRect.y;
    const containerAreaYMax = containerRect.y + containerRect.height;

    if (
      e.clientX < containerAreaXMin ||
      e.clientX > containerAreaXMax ||
      e.clientY < containerAreaYMin ||
      e.clientY > containerAreaYMax
    ) {
      onLeave();
    }

    window.removeEventListener("contextmenu", onMouseUp);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = () => {
    if (isDragMode) {
      isDragging = true;

      window.addEventListener("contextmenu", onMouseUp);
      window.addEventListener("mouseup", onMouseUp);
    }

    onClick();
  };

  container.addEventListener("mouseenter", onMouseEnter);
  container.addEventListener("mouseleave", onMouseLeave);
  container.addEventListener("mousedown", onMouseDown);
};

export const initCursor: InitCursor = ({
  cursorRef,
  initialPosition: { x, y },
}) => {
  const container = cursorRef.current as HTMLElement;
  container.style.transform = `translate3d(${x}px, ${y}px, 0)`;

  const onMouseMove = (e: MouseEvent) => {
    container.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  window.addEventListener("mousemove", onMouseMove);
};

