import { useEffect, FC } from "react";

import SmoothArea from "../SmoothArea";
import EmailAddress from "../EmailAddress";
import BigAction from "../BigAction";
import FadeIn from "../FadeIn";
import { setBodyTextColor } from "../../utils";
import {
  EMAIL_TITLE_ANIMATION_DELAY,
  HERO_TEXT_ANIMATION_DELAY,
  SOCIAL_TITLE_ANIMATION_DELAY,
} from "./Contact.data";
import styles from "./Contact.styles";

const Contact: FC = () => {
  useEffect(() => {
    setBodyTextColor("--white");

    return () => {
      setBodyTextColor("--black");
    };
  }, []);

  return (
    <>
      <div className={styles.fullBg} />
      <section className={styles.contactContainer}>
        <SmoothArea className={styles.contact}>
          <h4 className={styles.emailTitle}>
            <FadeIn
              animationDelay={EMAIL_TITLE_ANIMATION_DELAY}
              animateIntoView={false}
            >
              SEND US A MESSAGE
            </FadeIn>
          </h4>

          <div className={styles.emailAddress}>
            <EmailAddress
              animationDelay={HERO_TEXT_ANIMATION_DELAY}
              animateIntoView={false}
              inverse
            />
          </div>

        </SmoothArea>
      </section>
    </>
  );
};

export default Contact;
