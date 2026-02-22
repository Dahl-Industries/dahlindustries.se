import { useState, useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import cx from "classnames";

import FadeIn from "../FadeIn";
import BigText from "../BigText";
import { NAV_LINKS } from "../Header";
import {
  FADE_ANIMATION_DELAY,
  BIG_TEXT_ANIMATION_DELAY,
} from "./MobileMenu.data";
import type { MobileMenuProps } from "./MobileMenu.types";
import styles from "./MobileMenu.styles";
import { isIOS } from "../../utils";

const MobileMenu: FC<MobileMenuProps> = ({ activePath, onClose }) => {
  const [forceOverflow] = useState(isIOS());
  const [hasAnimatedActiveLink, setHasAnimatedActiveLink] = useState(false);

  const onNavItemTextAnimationEnd = (path: string) => {
    if (activePath === path) {
      setHasAnimatedActiveLink(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <section className={styles.mobileMenu}>
      <div
        className={cx(styles.mobileMenuContainer, {
          [styles.forceOverflow]: forceOverflow,
        })}
      >
        <header>
          <FadeIn
            className={styles.headerRow}
            animationDelay={FADE_ANIMATION_DELAY}
            animateIntoView={false}
          >
            <Link to="/">Dahl Industries</Link>
            <span className={styles.close} onClick={onClose}>
              Close
            </span>
          </FadeIn>
        </header>

        <div className={styles.menuContent}>
          <ul
            className={cx(styles.navLinks, {
              [styles.activeLinkUnderlinePassive]: !hasAnimatedActiveLink,
            })}
          >
            <li>
              <Link
                to="/"
                onClick={onClose}
                className={cx({
                  [styles.activeNavLink]: activePath === "/",
                })}
              >
                <BigText
                  text="Home"
                  className={styles.navItem}
                  animationDelay={BIG_TEXT_ANIMATION_DELAY}
                  animateIntoView={false}
                  snapOnAnimationEnd={() => onNavItemTextAnimationEnd("/")}
                />
              </Link>
            </li>
            {NAV_LINKS.map(({ link, label, target }, index) => (
              <li key={index}>
                {target ? (
                  <a
                    href={link}
                    className={cx({
                      [styles.activeNavLink]: activePath === link,
                    })}
                    target={target}
                    rel={target ? "noreferrer" : undefined}
                  >
                    <BigText
                      text={label}
                      className={styles.navItem}
                      animationDelay={BIG_TEXT_ANIMATION_DELAY}
                      animateIntoView={false}
                      snapOnAnimationEnd={() => onNavItemTextAnimationEnd(link)}
                    />
                  </a>
                ) : (
                  <Link
                    to={link}
                    onClick={onClose}
                    className={cx({
                      [styles.activeNavLink]: activePath === link,
                    })}
                  >
                    <BigText
                      text={label}
                      className={styles.navItem}
                      animationDelay={BIG_TEXT_ANIMATION_DELAY}
                      animateIntoView={false}
                      snapOnAnimationEnd={() => onNavItemTextAnimationEnd(link)}
                    />
                  </Link>
                )}
              </li>
            ))}
            <li></li>
          </ul>

          <FadeIn
            className={styles.currentRole}
            animationDelay={FADE_ANIMATION_DELAY}
            animateIntoView={false}
          >
            <p>
              Currently Design <br /> Engineer at Soundbank™
            </p>
          </FadeIn>

          <FadeIn
            className={styles.location}
            animationDelay={FADE_ANIMATION_DELAY}
            animateIntoView={false}
          >
            <p>
              Based in Sweden <br /> Stockholm
            </p>
          </FadeIn>
        </div>
      </div>
    </section>,
    document.body
  );
};

export default MobileMenu;
