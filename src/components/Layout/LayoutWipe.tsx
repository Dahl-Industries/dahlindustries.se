import { FC } from "react";
import { createPortal } from "react-dom";

import styles from "./Layout.styles";

const LayoutWipe: FC = () => {
  return createPortal(<div className={styles.layoutWipe} />, document.body);
};

export default LayoutWipe;

