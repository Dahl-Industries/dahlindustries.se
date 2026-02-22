import type { FC } from "react";

import SmoothArea, { ParallaxImage } from "../SmoothArea";
import FadeIn from "../FadeIn";
import AnimatedLines, { ElementType } from "../AnimatedLines";
import BigText from "../BigText";
import UnderlinedLink from "../UnderlinedLink";
import styles from "./HomeAbout.styles";

const HomeAbout: FC = () => (
  <section className={styles.homeAboutContainer}>
    <SmoothArea className={styles.homeAbout}>
      <FadeIn>
        <h4>03/</h4>
      </FadeIn>
      <div className={styles.hobbies}>
        <h2>
          <BigText text="Football," />
        </h2>
        <ParallaxImage
          src="/images/OG.jpg"
          className={styles.coverImage}
          containerClassName={styles.coverImageContainer}
          multiplier={0.1}
        />
        <h2>
          <BigText text="Succession," />
        </h2>
        <h2>
          <BigText text="Music." />
        </h2>
      </div>
      <AnimatedLines
        className={styles.title}
        elementType={ElementType.HEADING}
        text="about me"
      />
      <FadeIn className={styles.description}>
        <p>
          My hobbies take up a good portion of my leisure time. I'm either
          cheering up Arsenal, dodging a 'Boar on the Floor', exploring film
          or listening to delightful music.
        </p>
      </FadeIn>
    </SmoothArea>
  </section>
);

export default HomeAbout;
