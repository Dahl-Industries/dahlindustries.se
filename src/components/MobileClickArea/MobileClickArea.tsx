import { FC } from "react";
import cx from "classnames";

import type { MobileClickAreaProps } from "./MobileClickArea.types";
import styles from "./MobileClickArea.styles";

const MobileClickArea: FC<MobileClickAreaProps> = ({ className }) => (
  <div className={cx(styles.clickArea, className)}>
    <span className={styles.title}>
      <span>See more</span>
    </span>
  </div>
);

export default MobileClickArea;

