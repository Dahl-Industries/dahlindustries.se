import { useRef, useEffect, FC } from "react";
import cx from "classnames";

import { initSmooth } from "./SmoothArea.utils";
import type { SmoothAreaProps } from "./SmoothArea.types";
import styles from "./SmoothArea.styles";

const SmoothArea: FC<SmoothAreaProps> = ({
  children,
  className,
  inverseElementRefs,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const [destroy] = initSmooth(containerRef, inverseElementRefs);

    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={cx(styles.smoothArea, className)}>
      {children}
    </div>
  );
};

export default SmoothArea;

