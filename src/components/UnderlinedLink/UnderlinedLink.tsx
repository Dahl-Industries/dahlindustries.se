import type { FC } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import FadeIn from "../FadeIn";
import type { UnderlinedLinkProps } from "./UnderlinedLink.types";
import styles from "./UnderlinedLink.styles";

const UnderlinedLink: FC<UnderlinedLinkProps> = ({
  children,
  href,
  className,
}) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <FadeIn>
      {isExternal ? (
        <a
          href={href}
          className={cx(styles.underlinedLink, className)}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      ) : (
        <Link to={href} className={cx(styles.underlinedLink, className)}>
          {children}
        </Link>
      )}
    </FadeIn>
  );
};

export default UnderlinedLink;
