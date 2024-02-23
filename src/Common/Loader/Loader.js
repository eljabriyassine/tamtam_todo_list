import React, { PureComponent } from "react";

import styles from "./Loader.local.scss";

class Loader extends PureComponent {
  static defaultProps = {
    color: "#fff"
  };

  render() {
    const { color, ...props } = this.props;
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 52 52"
        enableBackground="new 0 0 0 0"
        {...props}
      >
        <circle fill={color} stroke="none" cx="6" cy="25" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill={color} stroke="none" cx="26" cy="25" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill={color} stroke="none" cx="46" cy="25" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>

      // <svg
      //   className={styles.loader}
      //   version="1.1"
      //   viewBox="0 0 100 100"
      //   {...props}
      // >
      //   <circle
      //     cx="50"
      //     cy="50"
      //     r="48"
      //     fill="transparent"
      //     stroke={color}
      //     strokeWidth="3"
      //     strokeDasharray="180"
      //   />
      // </svg>
    );
  }
}

export default Loader;
