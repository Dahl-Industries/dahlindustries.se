import { useState, useRef, FC, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";

import SmoothArea from "../SmoothArea";
import MobileMenu from "../MobileMenu";
import { NAV_LINKS, MOBILE_MENU_EXIT_DURATION } from "./Header.data";
import { isMobile } from "../../utils";
import styles from "./Header.styles";

const Header: FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const [isMobileDevice] = useState(isMobile());
  const activePath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={cx(styles.header, { [styles.stickyHeader]: isMobileDevice })}
    >
      <SmoothArea inverseElementRefs={[titleRef, navRef]}>
        <div className={styles.headerGrid}>
          <div ref={titleRef} className={styles.title}>
            <Link to="/">Dahl Industries</Link>
          </div>
          <div className={styles.currentRole}>
            <p>
              Currently Design <br /> Engineer at Soundbank™
            </p>
          </div>
          <div className={styles.location}>
            <p>
              Based in <br /> Stockholm, Sweden
            </p>
          </div>
          <div ref={navRef} className={styles.navArea}>
            <nav className={styles.lgNav}>
              {NAV_LINKS.map(({ link, label, target }, index) => (
                <Fragment key={index}>
                  {target ? (
                    <a
                      href={link}
                      className={cx(styles.navLink, {
                        [styles.active]: activePath === link,
                      })}
                      target={target}
                      rel={target ? "noreferrer" : undefined}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      to={link}
                      className={cx(styles.navLink, {
                        [styles.active]: activePath === link,
                      })}
                    >
                      {label}
                    </Link>
                  )}
                  {index !== NAV_LINKS.length - 1 && ", "}
                </Fragment>
              ))}
            </nav>
            <nav className={styles.mobileNav}>
              <span
                className={styles.mobileMenu}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                Menu
              </span>
            </nav>
          </div>
        </div>

        <CSSTransition
          in={isMobileMenuOpen}
          timeout={MOBILE_MENU_EXIT_DURATION}
          classNames={{ exitActive: styles.mobileMenuExit }}
          unmountOnExit
        >
          <MobileMenu
            activePath={activePath}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </CSSTransition>
      </SmoothArea>
    </header>
  );
};

export default Header;
