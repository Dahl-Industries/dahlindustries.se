import { useState, useEffect, useMemo, FC } from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";

import BigText from "../BigText";
import useImagesLoader from "../../hooks/useImagesLoader";
import {
  IMAGE_URLS,
  LOST_IMAGE_URL,
  PROGRESS_OFFSET,
  FLIP_DELAY,
  HAS_EXITED_DELAY,
} from "./Loader.data";
import { isMobile } from "../../utils";
import {
  preloadCaseImages,
  preloadModels,
  groupUrls,
  toThreeChars,
} from "./Loader.utils";
import type { LoaderProps } from "./Loader.types";
import styles from "./Loader.styles";

const Loader: FC<LoaderProps> = ({ onComplete }) => {
  const location = useLocation();
  const [image_urls] = useState([
    ...(location.pathname === "/404" ? [LOST_IMAGE_URL] : []),
    ...IMAGE_URLS,
  ]);
  const [hasExited, setHasExited] = useState(false);
  const [wipeOut, setWipeOut] = useState(false);
  const [groupedImageUrls] = useState(groupUrls(image_urls));
  const [currYear] = useState(new Date().getFullYear());
  const [flipVal, setFlipVal] = useState(false);
  const [topText, setTopText] = useState("  0");
  const [useFullContainer, setUseFullContainer] = useState(false);

  const progress = useImagesLoader(groupedImageUrls);

  const progressTranslateY = useMemo(() => {
    const viewHeight = isMobile() ? `${window.innerHeight}px` : "100vh";
    return `calc(${
      progress / 100
    } * (-${viewHeight} + ${PROGRESS_OFFSET}px + 0.875em))`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const progressText = useMemo(() => toThreeChars(progress), [progress]);

  const fetchOtherAsset = () => {
    preloadCaseImages();
    preloadModels();
  };

  useEffect(() => {
    if (progress === 0) {
      return;
    }

    setFlipVal(true);

    setTimeout(() => {
      setTopText(toThreeChars(progress));
      setFlipVal(false);

      if (progress === 100) {
        onComplete(true);
        setWipeOut(true);
      }
    }, FLIP_DELAY);

    if (progress === 100) {
      fetchOtherAsset();

      setTimeout(() => {
        setHasExited(true);
      }, HAS_EXITED_DELAY);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  useEffect(() => {
    setUseFullContainer(!isMobile());
  }, []);

  if (hasExited) {
    return null;
  }

  return (
    <section className={cx(styles.loader, { [styles.wipeOut]: wipeOut })}>
      <h3 className={styles.appDescription}>
        Dahl Industries <br /> Portfolio ©{currYear}
      </h3>
      <div
        className={cx(styles.progress, {
          [styles.fullContainer]: useFullContainer,
        })}
      >
        <div
          className={styles.progressBlock}
          style={{ transform: `translate3d(0, ${progressTranslateY}, 0)` }}
          aria-hidden="true"
        >
          <BigText
            className={cx(styles.progressValue, {
              [styles.flipVal]: flipVal,
              [styles.singleTop]: progress === 0,
              [styles.maxTop]: progress === 100,
            })}
            text={topText}
            isStatic
          />
          <BigText
            className={cx(styles.progressValue, {
              [styles.flipVal]: flipVal,
              [styles.maxVal]: progress === 100,
            })}
            text={progressText}
            isStatic
          />
        </div>
      </div>
    </section>
  );
};

export default Loader;
