import type { FC } from "react";

import SmoothArea from "../SmoothArea";
import FadeIn from "../FadeIn";
import AnimatedLines, { ElementType } from "../AnimatedLines";
import EmailAddress from "../EmailAddress";
import { SendMessageProps } from "./SendMessage.types";
import styles from "./SendMessage.styles";

const SendMessage: FC<SendMessageProps> = ({ sectionNumber }) => (
  <section className={styles.sendMessageContainer}>
    <SmoothArea className={styles.sendMessage}>
      <FadeIn>
        <h4>{`${sectionNumber}/`}</h4>
      </FadeIn>
      <AnimatedLines
        className={styles.titleTwo}
        elementType={ElementType.HEADING}
        text="Want to work together?"
      />
      <AnimatedLines
        className={styles.titleThree}
        elementType={ElementType.HEADING}
        text="Send us a message"
      />
      <div className={styles.emailAddress}>
        <EmailAddress />
      </div>
    </SmoothArea>
  </section>
);

export default SendMessage;
