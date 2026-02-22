import { useState, FC } from "react";

import SmoothArea, { ParallaxImage } from "../SmoothArea";
import AnimatedLines from "../AnimatedLines";
import BigText from "../BigText";
import FadeIn from "../FadeIn";
import Arrow from "../Arrow";
import { isSmallScreen } from "../../utils";
import {
  BIG_TEXT_ANIMATION_DELAY,
  DRAGGABLE_MASK_COVER_ANIMATION_DELAY,
  PARAGRAPGH_ANIMATION_DELAY,
  MOBILE_PARAGRAPGH_ANIMATION_DELAY,
  ARROW_ANIMATION_DELAY,
} from "./HomeHero.data";
import styles from "./HomeHero.styles";

const HomeHero: FC = () => {
  const [paragrapghAnimationDelay] = useState(
    isSmallScreen()
      ? MOBILE_PARAGRAPGH_ANIMATION_DELAY
      : PARAGRAPGH_ANIMATION_DELAY
  );

  return (
    <section className={styles.homeHeroContainer}>
      <SmoothArea className={styles.homeHero}>
        <h2 className={styles.title}>
          <BigText
            text="Creative"
            animationDelay={BIG_TEXT_ANIMATION_DELAY}
            animateIntoView={false}
          />
          <br />
          <BigText
            text="Developer"
            animationDelay={BIG_TEXT_ANIMATION_DELAY}
            animateIntoView={false}
          />
        </h2>
        <FadeIn
          className="heroPortrait"
          animationDelay={DRAGGABLE_MASK_COVER_ANIMATION_DELAY}
          animateIntoView={false}
        >
          <ParallaxImage
            src="/images/hero-cover.jpg"
            alt="Philip Dahl portrait"
            containerClassName="heroPortraitContainer"
            className="heroPortraitImage"
            multiplier={0.1}
          />
        </FadeIn>
        <Arrow
          className={styles.arrow}
          animationDelay={ARROW_ANIMATION_DELAY}
        />
        <AnimatedLines
          className={styles.description}
          animationDelay={paragrapghAnimationDelay}
          text="I support visionaires and enterprises with creative development."
          animateIntoView={false}
        />
        <h2 className={styles.name}>
          <BigText
            text="Philip"
            animationDelay={BIG_TEXT_ANIMATION_DELAY}
            animateIntoView={false}
          />
          <br />
          <BigText
            text="Dahl"
            animationDelay={BIG_TEXT_ANIMATION_DELAY}
            animateIntoView={false}
          />
        </h2>
      </SmoothArea>
    </section>
  );
};

export default HomeHero;
