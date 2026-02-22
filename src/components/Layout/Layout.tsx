import type { FC } from "react";
import cx from "classnames";

import Header from "../Header";
import Footer from "../Footer";
import type { LayoutProps } from "./Layout.types";
import styles from "./Layout.styles";

const Layout: FC<LayoutProps> = ({ children, state }) => {
  const hasEntered = state === "entered";
  const isExiting = state === "exiting";

  return (
    <>
      <div className={cx(styles.layout, { [styles.exiting]: isExiting })}>
        {(hasEntered || isExiting) && (
          <>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Layout;

