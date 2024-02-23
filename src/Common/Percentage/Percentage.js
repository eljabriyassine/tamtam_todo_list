import React, { Component } from "react";
import styles from "./Percentage.local.scss";
import { IconContext } from "react-icons";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { abbreviateNumber } from "Utils";

class Percentage extends Component {
  render() {
    const { percentage } = this.props;
    if (!percentage) {
      return <span className={styles.percentage__na}>N/A</span>;
    }
    if (percentage > 0) {
      return (
        <span className={styles.percentage__positive}>
          {/*&nbsp;*/}
          <span className="">
            <IconContext.Provider
              value={{ style: { verticalAlign: "sub", marginBottom: 1 } }}
            >
              <TiArrowSortedUp />
            </IconContext.Provider>
          </span>
          <span>
            {Math.abs(percentage).toString().length > 7
              ? abbreviateNumber(percentage, 0)
              : percentage}%
          </span>
        </span>
      );
    } else if (percentage < 0) {
      return (
        <span className={styles.percentage__negative}>
          {/*&nbsp;*/}
          <span className="">
            <IconContext.Provider
              value={{ style: { verticalAlign: "sub", marginBottom: 1 } }}
            >
              <TiArrowSortedDown />
            </IconContext.Provider>
          </span>
          {Math.abs(percentage).toString().length > 7
            ? abbreviateNumber(Math.abs(percentage), 0)
            : Math.abs(percentage)}%
        </span>
      );
    }
  }
}

export default Percentage;
