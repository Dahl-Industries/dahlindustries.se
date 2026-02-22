import { useState, useRef, useEffect, FC } from "react";
import cx from "classnames";

import { initParallax } from "./SmoothArea.utils";
import {
  PARALLAX_IMAGE_EASE,
  DEFAULT_PARALLAX_IMAGE_MULTIPLIER,
} from "./SmoothArea.data";
import type { ParallaxImageProps } from "./SmoothArea.types";
import styles from "./SmoothArea.styles";

const ParallaxImage: FC<ParallaxImageProps> = ({
  src,
  alt = "",
  className,
  containerClassName,
  scaleUpOnHover,
  scaleUp,
  animateIn,
  animationDelay,
  multiplier = DEFAULT_PARALLAX_IMAGE_MULTIPLIER,
}) => {
  const [canAnimateIn, setCanAnimateIn] = useState(!animationDelay);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onAnimate = (el: HTMLElement, val: number) => {
    if (containerRef.current) {
      const translateY = -(containerRef.current.offsetHeight * 0.2 + val);
      el.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${translateY},0,1)`;
    }
  };

  useEffect(() => {
    if (animationDelay) {
      setTimeout(() => {
        setCanAnimateIn(true);
      }, animationDelay * 1000);
    }

    const [destroy] = initParallax({
      onAnimate,
      elementRef: imageRef,
      multiplier,
      ease: PARALLAX_IMAGE_EASE,
      willChange: "transform",
    });

    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cx(styles.parallaxImageContainer, containerClassName, {
        [styles.animateIn]: animateIn,
        [styles.passive]: animateIn && !canAnimateIn,
        [styles.scalableOnHover]: scaleUpOnHover,
      })}
    >
      <div
        className={cx(styles.parallaxImageWrapper, {
          [styles.scalable]: scaleUpOnHover || typeof scaleUp === "boolean",
          [styles.scaleUp]: scaleUp,
        })}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={cx(styles.parallaxImage, className)}
        />
      </div>
    </div>
  );
};

export default ParallaxImage;

