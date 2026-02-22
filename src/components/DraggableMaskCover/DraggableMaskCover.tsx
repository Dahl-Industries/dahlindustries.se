import { useState, useEffect, useRef, FC } from "react";
import cx from "classnames";

import AreaCursor, { Mode } from "../AreaCursor";
import { initParallax } from "../SmoothArea/SmoothArea.utils";
import { PARALLAX_IMAGE_EASE } from "../SmoothArea/SmoothArea.data";
import { initDraggableCover } from "./DraggableMaskCover.utils";
import type { DraggableMaskCoverProps } from "./DraggableMaskCover.types";
import styles from "./DraggableMaskCover.styles";

const HERO_PARALLAX_MULTIPLIER = 0.1;

const DraggableMaskCover: FC<DraggableMaskCoverProps> = ({
  animationDelay,
}) => {
  const [isReady, setIsReady] = useState(!animationDelay);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const hotspotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationDelay) {
      initDraggableCover(imageContainerRef, hotspotRef);
    } else {
      setTimeout(() => {
        setIsReady(true);
        initDraggableCover(imageContainerRef, hotspotRef);
      }, animationDelay * 1000);
    }

    const onAnimate = (el: HTMLElement, val: number) => {
      el.style.transform = `translate3d(0, ${-val}px, 0)`;
    };

    const [destroy] = initParallax({
      onAnimate,
      elementRef: coverRef,
      multiplier: HERO_PARALLAX_MULTIPLIER,
      ease: PARALLAX_IMAGE_EASE,
      willChange: "transform",
    });

    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={coverRef} className={cx(styles.cover, { [styles.passive]: !isReady })}>
      <div className={styles.coverImageContainer} ref={imageContainerRef}>
        <img
          className={styles.coverImage}
          src="/images/hero-cover.jpg"
          alt="Philip Dahl portrait"
        />
      </div>
      <div ref={hotspotRef} className={styles.hotspot} />
      <AreaCursor areaRef={hotspotRef} mode={Mode.DRAG} />
    </div>
  );
};

export default DraggableMaskCover;
