import { useState, useEffect, useRef, FC } from "react";
import { CSSTransition } from "react-transition-group";

import BigAction, { ElementType } from "../BigAction";
import AnimatedLines from "../AnimatedLines";
import { ParallaxImage, initSticky } from "../SmoothArea";
import AreaCursor from "../AreaCursor";
import MobileClickArea from "../MobileClickArea";
import ProjectModal from "../ProjectModal";
import { MODAL_EXIT_DURATION } from "./Projects.data";
import { ProjectProps } from "./Projects.types";
import styles from "./Projects.styles";

const STICKY_TOP = 100;

const Project: FC<ProjectProps> = ({
  title,
  titleTwo,
  fullTitle,
  shortDescription,
  coverPhotoUrl,
  link,
  ...projectModalProps
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scaleCoverUp, setScaleCoverUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    initSticky({
      elementRef: detailsRef,
      ancestorRef: containerRef,
      top: STICKY_TOP,
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.project}>
      <div className={styles.details}>
        <div ref={detailsRef}>
          <h2>
            <BigAction
              text={title}
              textTwo={titleTwo}
              srText={fullTitle}
              elementType={ElementType.BUTTON}
              onClick={handleClick}
              onMouseEnter={() => setScaleCoverUp(true)}
              onMouseLeave={() => setScaleCoverUp(false)}
              withAreaCursor
              areaCursorLabel="View"
            />
          </h2>
          <AnimatedLines
            className={styles.shortDescription}
            text={shortDescription}
          />
        </div>
      </div>
      <div
        ref={coverRef}
        className={styles.cover}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <AreaCursor areaRef={coverRef} label="View" />
        <MobileClickArea />
        <ParallaxImage
          src={coverPhotoUrl}
          className={styles.coverImage}
          containerClassName={styles.coverImageContainer}
          scaleUp={scaleCoverUp}
          scaleUpOnHover
        />
      </div>

      <CSSTransition
        in={isModalOpen}
        timeout={MODAL_EXIT_DURATION}
        classNames={{ exitActive: styles.projectModalExit }}
        unmountOnExit
      >
        <ProjectModal
          {...projectModalProps}
          onClose={closeModal}
        />
      </CSSTransition>
    </div>
  );
};

export default Project;

