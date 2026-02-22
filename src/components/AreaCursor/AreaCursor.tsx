import { useState, useEffect, useRef, FC } from "react";
import { createPortal } from "react-dom";

import Cursor from "./Cursor";
import { FADE_OUT_DURATION, DEFAULT_LABELS } from "./AreaCursor.data";
import { initAreaCursor } from "./AreaCursor.utils";
import { AreaCursorProps, Mode, CursorPosition } from "./AreaCursor.types";

const AreaCursor: FC<AreaCursorProps> = ({
  areaRef,
  label,
  className,
  mode = Mode.CLICK,
  onCursorExit,
}) => {
  const [initialPosition, setInitialPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [renderCusor, setRenderCursor] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [fading, setFading] = useState(false);

  const fadeTimeout = useRef<NodeJS.Timeout>();

  const onEnter = (cursorPosition: CursorPosition) => {
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
    }

    setInitialPosition(cursorPosition);
    setRenderCursor(true);
    setFading(false);
  };

  const onLeave = () => {
    setClicked(false);
    setFading(true);

    // prevent double onCursorExit call triggered by PresentationControls triggering mouse leave on mouse up when dragging ends.
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
    }

    fadeTimeout.current = setTimeout(() => {
      setRenderCursor(false);
      if (onCursorExit) {
        onCursorExit();
      }
    }, FADE_OUT_DURATION * 1000);
  };

  const onClick = () => {
    if (mode === Mode.CLICK) {
      setClicked(false);
      setTimeout(() => setClicked(true), 0);
      return;
    }

    setClicked(true);
  };

  const onDragEnd = () => {
    setClicked(false);
  };

  useEffect(() => {
    initAreaCursor({
      areaRef,
      mode,
      onEnter,
      onLeave,
      onClick,
      onDragEnd,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!renderCusor) {
    return null;
  }

  return createPortal(
    <Cursor
      mode={mode}
      initialPosition={initialPosition}
      clicked={clicked}
      fading={fading}
      label={label || DEFAULT_LABELS[mode]}
      className={className}
    />,
    document.body
  );
};

export default AreaCursor;

