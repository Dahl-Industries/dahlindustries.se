import { useState, useRef, FC } from "react";
import cx from "classnames";

import BigText from "../BigText";
import AreaCursor from "../AreaCursor";
import { isMobile } from "../../utils";
import { BigActionProps, ElementType } from "./BigAction.types";
import styles from "./BigAction.styles";

const BigAction: FC<BigActionProps> = ({
  text,
  textTwo,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  srText,
  elementType,
  withAreaCursor,
  areaCursorLabel,
  areaCursorClassName,
  onAreaCursorExit,
  animationDelay,
  animateIntoView = true,
  inverse,
}) => {
  const [textTwoRootMargin] = useState(isMobile() ? 43 : 110);
  const [hasCompletedTextAnimation, setHasCompletedTextAnimation] =
    useState(false);

  const actionRef = useRef<HTMLButtonElement>(null);

  const onTextAnimationEnd = () => {
    setHasCompletedTextAnimation(true);
  };

  const textsRender = (
    <>
      <BigText
        text={text}
        snapOnAnimationEnd={onTextAnimationEnd}
        withoutSrText={!srText}
        srText={srText}
      />
      {textTwo && (
        <>
          <span className={styles.textsSeperator} />
          <BigText
            text={textTwo}
            intersectionThreshold={0}
            intersectionRootMargin={`${textTwoRootMargin}px`}
            animationDelay={animationDelay}
            animateIntoView={animateIntoView}
            withoutSrText
          />
        </>
      )}
      {withAreaCursor && (
        <AreaCursor
          areaRef={actionRef}
          label={areaCursorLabel}
          className={areaCursorClassName}
          onCursorExit={onAreaCursorExit}
        />
      )}
    </>
  );

  if (elementType === ElementType.BUTTON) {
    return (
      <button
        ref={actionRef}
        className={cx(styles.bigActionBtn, {
          [styles.withAreaCursor]: withAreaCursor,
        })}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={cx(styles.bigAction, className, {
            [styles.passive]: !hasCompletedTextAnimation,
            [styles.inverse]: inverse,
          })}
        >
          {textsRender}
        </span>
      </button>
    );
  }

  return (
    <span
      ref={actionRef}
      className={cx(styles.bigAction, className, {
        [styles.passive]: !hasCompletedTextAnimation,
        [styles.inverse]: inverse,
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {textsRender}
    </span>
  );
};

export default BigAction;

