import { useState, useEffect, useRef, useMemo, FC } from "react";
import cx from "classnames";

import { SIZE_CLASS_NAMES } from "./AnimatedLines.data";
import { initLinesAnimation } from "./AnimatedLines.utils";
import { AnimatedLinesProps, ElementType } from "./AnimatedLines.types";
import styles from "./AnimatedLines.styles";

const AnimatedLines: FC<AnimatedLinesProps> = ({
  text,
  className,
  animationDelay,
  size,
  animateIntoView = true,
  intersectionThreshold,
  intersectionRootMargin,
  elementType,
  noTextTransform,
}) => {
  const [animationsCleanUp, setAnimationsCleanUp] = useState(false);
  const words = useMemo(() => text.split(" "), [text]);
  const [initialWords] = useState(words);
  const sizeClassName = size && SIZE_CLASS_NAMES[size];

  const containerRef = useRef<HTMLParagraphElement | HTMLHeadingElement>(null);

  const wordsRender = (
    <>
      {words.map((word, index) => (
        <span
          key={index}
          className={cx({ [styles.passive]: !animationsCleanUp })}
        >
          {word}
          {index < words.length - 1 && " "}
        </span>
      ))}
      {!animationsCleanUp && (
        <span className={styles.animatedLines} aria-hidden="true" />
      )}
    </>
  );

  const staticReset = () => {
    setAnimationsCleanUp(true);
  };

  useEffect(() => {
    if (words !== initialWords && !animationsCleanUp) {
      staticReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  useEffect(() => {
    initLinesAnimation({
      containerRef,
      staticReset,
      animationDelay,
      animateIntoView,
      intersectionThreshold,
      intersectionRootMargin,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (elementType === ElementType.HEADING) {
    return (
      <h4
        ref={containerRef}
        className={cx(styles.animatedLinesContainer, className, sizeClassName, {
          [styles.noTextTransform]: noTextTransform,
        })}
      >
        {wordsRender}
      </h4>
    );
  }

  if (elementType === ElementType.SPAN) {
    return (
      <span
        ref={containerRef}
        className={cx(styles.animatedLinesContainer, className, sizeClassName, {
          [styles.noTextTransform]: noTextTransform,
        })}
      >
        {wordsRender}
      </span>
    );
  }

  return (
    <p
      ref={containerRef}
      className={cx(styles.animatedLinesContainer, className, sizeClassName, {
        [styles.noTextTransform]: noTextTransform,
      })}
    >
      {wordsRender}
    </p>
  );
};

export default AnimatedLines;

