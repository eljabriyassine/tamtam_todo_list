import React, { PureComponent } from "react";

import styles from "./Checkmark.local.scss";

class Checkmark extends PureComponent {
  render() {
    return (
      <svg
        className={styles.checkmark}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
        {...this.props}
      >
        <circle className={styles.circle} cx="26" cy="26" r="25" fill="none" />
        <path
          className={styles.check}
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    );
  }
}

export default Checkmark;
