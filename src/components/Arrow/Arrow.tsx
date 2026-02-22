import { useState, useEffect, FC } from "react";
import cx from "classnames";

import type { ArrowProps } from "./Arrow.types";
import styles from "./Arrow.styles";

const Arrow: FC<ArrowProps> = ({ className, animationDelay }) => {
  const [isReady, setIsReady] = useState(!animationDelay);

  useEffect(() => {
    if (animationDelay) {
      setTimeout(() => {
        setIsReady(true);
      }, animationDelay * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className={cx(styles.arrow, className, { [styles.passive]: !isReady })}
    >
      <span>↓</span>
    </span>
  );
};

export default Arrow;

