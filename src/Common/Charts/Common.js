import React, { PureComponent } from "react";
import classnames from "classnames";
import { abbreviateNumber, number_format } from "Utils";
import styles from "./Charts.local.scss";

export class CustomizedYAxisTick extends PureComponent {
  render() {
    const { x, y, payload, currency } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={3}
          dx={-2}
          textAnchor="end"
          fill="#6D7F92"
          fontSize={12}
          className={classnames(styles.axis_tick, styles.axis_y)}
        >
          {abbreviateNumber(payload.value)} {currency ? "€" : ""}
        </text>
      </g>
    );
  }
}

export class CustomizedXAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#6D7F92"
          fontSize={12}
          className={classnames(styles.axis_tick, styles.axis_x)}
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export class CustomTooltip extends PureComponent {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className={styles.custom_tooltip}>
          <p className={styles.label}>{`${label}`}</p>
          {payload.map((item, i) => {
            return (
              <p key={i} className={styles.intro} style={{ color: item.color }}>
                {item.name} :{" "}
                <b>
                  {item.value !== "N/A"
                    ? number_format(item.value, 2, ",", " ")
                    : item.value}
                </b>
              </p>
            );
          })}
        </div>
      );
    }

    return null;
  }
}
