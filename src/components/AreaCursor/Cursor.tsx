import { useEffect, useRef, FC } from "react";
import cx from "classnames";

import { initCursor } from "./AreaCursor.utils";
import { CursorProps, Mode } from "./AreaCursor.types";
import styles from "./AreaCursor.styles";

const Cursor: FC<CursorProps> = ({
  mode,
  initialPosition,
  clicked,
  fading,
  label,
  className,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fading) {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    } else {
      document.body.style.cursor = "none";
      document.body.style.userSelect = "none";
    }
  }, [fading]);

  useEffect(() => {
    initCursor({ cursorRef, initialPosition });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cx(styles.cursor, className, {
        [styles.fading]: fading,
        [styles.clicked]: clicked && mode === Mode.CLICK,
        [styles.dragging]: clicked && mode === Mode.DRAG,
      })}
    >
      <span className={styles.wrapper}>
        <span className={styles.cursorRing}>
          <span>{label}</span>
        </span>
      </span>
    </div>
  );
};

export default Cursor;

