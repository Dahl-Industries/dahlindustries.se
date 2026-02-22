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
          text="DAHL INDUSTRIES IS A COMPANY BUILDING THE NEXT GENERATION OF BUSINESS. DESIGNED AND ENGINEERED IN STOCKHOLM, WE ARCHITECT INTELLIGENT SYSTEMS THAT REDEFINE HOW PHYSICAL SPACES OPERATE."
        />
        <AnimatedLines
          className={styles.personalInterests}
          size={Size.LG}
          text="THROUGH OUR FLAGSHIP PRODUCT, SOUNDBANK™, WE ARE REIMAGINING IN-STORE AUDIO BY MERGING SOPHISTICATED DESIGN WITH AUTONOMOUS MUSIC CURATION."
        />
      </div>
      <FadeIn className={styles.advantageTitle}>
        <h4>A blend of UI and product engineering.</h4>
      </FadeIn>
      <FadeIn className={styles.advantage}>
        <p>
          With a foundation in editorial design and journalism, we bring a
          narrative-driven approach to technical systems.
          <br /> <br />
          Having led creative efforts as Editor-in-Chief, our founder combines
          the precision of layout design with robust engineering to build
          digital products for visionaries and enterprises.
        </p>
      </FadeIn>
    </SmoothArea>
  </section>
);

export default HomeProfile;
