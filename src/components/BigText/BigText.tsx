import { useState, useEffect, useRef, useMemo, FC } from "react";
import cx from "classnames";

import { initCharsAnimation } from "./BigText.utils";
import type { BigTextProps } from "./BigText.types";
import styles from "./BigText.styles";

const BigText: FC<BigTextProps> = ({
  text,
  className,
  isStatic,
  animationDelay,
  animateIntoView = true,
  snapOnAnimationEnd,
  intersectionThreshold,
  intersectionRootMargin,
  withoutSrText,
  srText,
}) => {
  const [animationsCleanUp, setAnimationsCleanUp] = useState(false);
  const chars = useMemo(() => text.split(""), [text]);
  const containerRef = useRef<HTMLSpanElement>(null);

  const staticReset = () => {
    setAnimationsCleanUp(true);
  };

  useEffect(() => {
    if (!isStatic) {
      initCharsAnimation({
        containerRef,
        staticReset,
        animationDelay,
        animateIntoView,
        snapOnAnimationEnd,
        intersectionThreshold,
        intersectionRootMargin,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={containerRef} className={cx(styles.bigText, className)}>
      {isStatic ? (
        chars.map((char, index) => <span key={index}>{char}</span>)
      ) : (
        <>
          <span className={styles.srText}>
            {!withoutSrText && (srText || text)}
          </span>

          {chars.map((char, index) => (
            <span
              className={cx({ [styles.passive]: !animationsCleanUp })}
              key={index}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}

          {!animationsCleanUp && (
            <span className={styles.animatedChars} aria-hidden="true" />
          )}
        </>
      )}
    </span>
  );
};

export default BigText;

