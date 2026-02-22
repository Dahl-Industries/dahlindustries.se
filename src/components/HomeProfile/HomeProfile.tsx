import type { FC } from "react";

import SmoothArea from "../SmoothArea";
import UnderlinedLink from "../UnderlinedLink";
import FadeIn from "../FadeIn";
import AnimatedLines, { Size } from "../AnimatedLines";
import styles from "./HomeProfile.styles";

const HomeProfile: FC = () => (
  <section className={styles.homeProfileContainer}>
    <SmoothArea className={styles.homeProfile}>
      <FadeIn>
        <h4>01/</h4>
      </FadeIn>
      <div className={styles.bio}>
        <AnimatedLines
          size={Size.LG}
          text="DESIGNED AND ENGINEERED IN STOCKHOLM, DAHL INDUSTRIES ARCHITECT INTELLIGENT SYSTEMS THAT REDEFINE HOW PHYSICAL SPACES OPERATE."
        />
        <AnimatedLines
          className={styles.personalInterests}
          size={Size.LG}
          text="THROUGH OUR FLAGSHIP PRODUCT, SOUNDBANK™, WE ARE REIMAGINING AUDIO BY MERGING SOPHISTICATED DESIGN WITH AUTONOMOUS CURATION."
        />
      </div>
      <FadeIn className={styles.advantageTitle}>
        <h4>A blend of UI and product engineering.</h4>
      </FadeIn>
      <FadeIn className={styles.advantage}>
        <p>
          Rooted in editorial design and journalism, this approach brings
          narrative depth to technical systems.
          <br /> <br />
          Cultivating creative leadership as an Editor-in-Chief translates the
          precision of layout design and robust engineering into perfectly built
          digital products.
        </p>
      </FadeIn>
    </SmoothArea>
  </section>
);

export default HomeProfile;
