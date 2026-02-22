import { useState, FC } from "react";
import cx from "classnames";

import SmoothArea from "../SmoothArea";
import Projects from "../Projects";
import FadeIn from "../FadeIn";
import AnimatedLines, { ElementType } from "../AnimatedLines";
import BigText from "../BigText";
import {
  WORK_TABS,
  HERO_NUMBER_ANIMATION_DELAY,
  HERO_TEXT_ANIMATION_DELAY,
  TAB_DESCRIPTIONANIMATION_DELAY,
} from "./WorkTabs.data";
import styles from "./WorkTabs.styles";

const WorkTabs: FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className={styles.workTabsContainer}>
      <SmoothArea className={styles.workTabs}>
        <FadeIn
          animationDelay={HERO_NUMBER_ANIMATION_DELAY}
          animateIntoView={false}
        >
          <h4>01/</h4>
        </FadeIn>

        <div className={styles.tabHeader}>
          {WORK_TABS.map(({ title, total }, index) => (
            <button
              key={index}
              className={cx(styles.tabControl, {
                [styles.inactive]: activeTabIndex !== index,
              })}
              onClick={() => setActiveTabIndex(index)}
            >
              <span>
                <BigText
                  text={title}
                  animationDelay={HERO_TEXT_ANIMATION_DELAY}
                  animateIntoView={false}
                />
              </span>
              <AnimatedLines
                className={styles.typeCount}
                elementType={ElementType.SPAN}
                text={total}
                animationDelay={HERO_TEXT_ANIMATION_DELAY}
                animateIntoView={false}
              />
            </button>
          ))}
        </div>

        <div className={styles.tabTitles}>
          {WORK_TABS.map(({ title }, index) => (
            <AnimatedLines
              key={index}
              className={cx(styles.tabTitle, {
                [styles.passive]: activeTabIndex !== index,
              })}
              elementType={ElementType.HEADING}
              text={title}
              animationDelay={HERO_TEXT_ANIMATION_DELAY}
              animateIntoView={false}
            />
          ))}
        </div>

        <FadeIn
          className={styles.tabDescriptions}
          animationDelay={TAB_DESCRIPTIONANIMATION_DELAY}
          animateIntoView={false}
        >
          {WORK_TABS.map(({ description }, index) => (
            <p
              key={index}
              className={cx(styles.tabDescription, {
                [styles.passive]: activeTabIndex !== index,
              })}
            >
              {description}
            </p>
          ))}
        </FadeIn>

        <Projects projectsType={WORK_TABS[activeTabIndex].projectsType} />
      </SmoothArea>
    </section>
  );
};

export default WorkTabs;

