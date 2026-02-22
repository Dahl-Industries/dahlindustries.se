import { useState, useEffect, useRef, FC } from "react";
import { createPortal } from "react-dom";

import AnimatedLines from "../AnimatedLines";
import FadeIn from "../FadeIn";
import { isMobile, isSmallScreen } from "../../utils";
import {
  FADE_ANIMATION_DELAY,
  BIG_TEXT_ANIMATION_DELAY,
  MOBILE_FADE_ANIMATION_DELAY,
  MOBILE_BIG_TEXT_ANIMATION_DELAY,
} from "./ProjectModal.data";
import { initMediaScroll, trapFocusInElement } from "./ProjectModal.utils";
import type { ProjectModalProps } from "./ProjectModal.types";
import styles from "./ProjectModal.styles";

const ProjectModal: FC<ProjectModalProps> = ({
  name,
  link,
  description,
  client,
  clientLink,
  role,
  year,
  modalBg,
  mediaUrls,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const [useHistory] = useState(isMobile());
  const [fadeAnimationDelay] = useState(
    isSmallScreen() ? MOBILE_FADE_ANIMATION_DELAY : FADE_ANIMATION_DELAY
  );
  const [bigTextAnimationDelay] = useState(
    isSmallScreen() ? MOBILE_BIG_TEXT_ANIMATION_DELAY : BIG_TEXT_ANIMATION_DELAY
  );

  const closeModal = () => {
    if (useHistory) {
      history.back();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const [destroy] = initMediaScroll(containerRef, mediaRef);

    return () => {
      document.body.style.overflow = "";
      destroy();
    };
  }, []);

  useEffect(() => {
    const [destroy] = trapFocusInElement(headerRef);

    return destroy;
  }, []);

  useEffect(() => {
    if (useHistory) {
      location.hash = `#${name}`;
      window.addEventListener("popstate", onClose);

      return () => {
        window.removeEventListener("popstate", onClose);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <section className={styles.modal} style={{ backgroundColor: modalBg }}>
      <div className={styles.contentsContainer}>
        <div ref={containerRef} className={styles.contents}>
          <header ref={headerRef} className={styles.header}>
            <FadeIn
              className={styles.headerGrid}
              animationDelay={fadeAnimationDelay}
              animateIntoView={false}
            >
              <div className={styles.headerTitle}>Case study</div>
              <div className={styles.headerLiveLink} />
              <div className={styles.headerProjectName} />
              <button className={styles.close} onClick={closeModal}>
                Close
              </button>
            </FadeIn>
          </header>
          <div className={styles.body}>
            <div className={styles.details}>
              <AnimatedLines
                className={styles.description}
                text={description}
                animationDelay={bigTextAnimationDelay}
                animateIntoView={false}
                noTextTransform
              />

              <FadeIn
                animationDelay={fadeAnimationDelay}
                animateIntoView={false}
                className={styles.bodyLiveLink}
              >
                <a
                  className={styles.link}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit live link
                </a>
              </FadeIn>

              <FadeIn
                animationDelay={fadeAnimationDelay}
                animateIntoView={false}
              >
                <h4>PROJECT INFO</h4>
                <dl className={styles.descriptionList}>
                  {client && (
                    <div className={styles.descriptionBlock}>
                      <dt>Client</dt>
                      <dd>
                        {clientLink ? (
                          <a
                            className={styles.link}
                            href={clientLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {client}
                          </a>
                        ) : (
                          client
                        )}
                      </dd>
                    </div>
                  )}
                  <div className={styles.descriptionBlock}>
                    <dt>Role</dt>
                    <dd>{role}</dd>
                  </div>
                  <div className={styles.descriptionBlock}>
                    <dt>Year</dt>
                    <dd>{year}</dd>
                  </div>
                </dl>
              </FadeIn>
            </div>

            {mediaUrls.length === 1 && mediaUrls[0].endsWith(".mp4") ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%", maxHeight: "calc(100vh - 120px)", padding: "20px" }}>
                <video
                  src={mediaUrls[0]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
                />
              </div>
            ) : (
              <>
                <div className={styles.mediaContainer}>
                  <div ref={mediaRef} className={styles.media}>
                    {mediaUrls.map((url, index) => (
                      <img key={index} src={url} alt="" />
                    ))}
                    <div className={styles.scrollWidthRetainer} />
                  </div>
                </div>

                <FadeIn
                  animationDelay={fadeAnimationDelay}
                  animateIntoView={false}
                  className={styles.mobileMediaContainer}
                >
                  {mediaUrls.map((url, index) => (
                    <img key={index} src={url} alt="" />
                  ))}
                </FadeIn>
              </>
            )}
          </div>
        </div>
      </div>
    </section>,
    document.body
  );
};

export default ProjectModal;

