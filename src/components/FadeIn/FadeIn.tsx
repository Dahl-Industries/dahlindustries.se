import { useState, useEffect, useRef, FC } from "react";
import cx from "classnames";

import type { FadeInProps } from "./FadeIn.types";
import styles from "./FadeIn.styles";

const FadeIn: FC<FadeInProps> = ({
  className,
  animationDelay = 0.3,
  animateIntoView = true,
  children,
}) => {
  const [isReady, setIsReady] = useState(!animationDelay && !animateIntoView);
  const containerRef = useRef<HTMLDivElement>(null);

  const setIsReadyWithDelay = () => {
    setTimeout(() => {
      setIsReady(true);
    }, animationDelay * 1000);
  };

  const observeContainer = () => {
    const containerEl = containerRef.current as HTMLDivElement;

    const intersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inViewObserver.unobserve(containerEl);

          if (animationDelay) {
            setIsReadyWithDelay();
          } else {
            setIsReady(true);
          }
        }
      });
    };

    const intersectionObserverOptions = {
      threshold: 0.2,
    };

    const inViewObserver = new IntersectionObserver(
      intersectionObserverCallback,
      intersectionObserverOptions
    );

    inViewObserver.observe(containerEl);
  };

  useEffect(() => {
    if (animateIntoView) {
      observeContainer();
    } else if (animationDelay) {
      setIsReadyWithDelay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cx(styles.fadeIn, className, { [styles.passive]: !isReady })}
    >
      {children}
    </div>
  );
};

export default FadeIn;

