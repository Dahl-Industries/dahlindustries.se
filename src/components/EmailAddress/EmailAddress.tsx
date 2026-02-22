import { useState, FC } from "react";
import cx from "classnames";

import BigAction from "../BigAction";
import {
  COPY_LABEL,
  COPIED_LABEL,
  COPIED_STATE_DELAY,
} from "./EmailAddress.data";
import type { EmailAddressProps } from "./EmailAddress.types";
import styles from "./EmailAddress.styles";

const Arrow: FC<EmailAddressProps> = ({
  className,
  animationDelay,
  animateIntoView,
  inverse,
}) => {
  const [hasCopiedToClipboard, setHasCopiedToClipboard] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText("info@dahlindustries.se");

    setTimeout(() => {
      setHasCopiedToClipboard(true);
    }, COPIED_STATE_DELAY * 1000);
  };

  const resetCopyState = () => {
    setHasCopiedToClipboard(false);
  };

  return (
    <>
      <BigAction
        onClick={copyToClipboard}
        className={cx(
          styles.clipboardText,
          styles.emailAddressBigText,
          className
        )}
        text="info@dahl"
        textTwo="industries.se"
        withAreaCursor
        animationDelay={animationDelay}
        animateIntoView={animateIntoView}
        inverse={inverse}
        areaCursorLabel={hasCopiedToClipboard ? COPIED_LABEL : COPY_LABEL}
        areaCursorClassName={styles.areaCursor}
        onAreaCursorExit={resetCopyState}
        srText="info@dahlindustries.se"
      />
      <a
        className={styles.emailToAddress}
        href="mailto:info@dahlindustries.se"
      >
        <BigAction
          className={styles.emailAddressBigText}
          text="info@"
          inverse={inverse}
          srText="info@dahlindustries.se"
        />
        <BigAction
          className={styles.emailAddressBigText}
          text="dahl"
          inverse={inverse}
        />
        <BigAction
          className={styles.emailAddressBigText}
          text="industries"
          inverse={inverse}
        />
        <BigAction
          className={styles.emailAddressBigText}
          text=".se"
          inverse={inverse}
        />
      </a>
    </>
  );
};

export default Arrow;
