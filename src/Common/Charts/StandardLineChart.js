import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // Rectangle,
  // LabelList,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import styles from "./Charts.local.scss";
import {
  CustomizedXAxisTick,
  CustomizedYAxisTick,
  CustomTooltip
} from "./Common";

const colors = [
  "#2495E1",
  "#F84154",
  "#FA9437",
  "#87E9FB",
  "#5FFF6B",
  "#1824ff"
];

export class StandardLineChart extends PureComponent {
  render() {
    const {
      chartData,
      dataKeysY,
      dataKeyX,
      currency,
      legendLabels,
      containerWidth,
      containerHeight
    } = this.props;
    return (
      <ResponsiveContainer
        width={containerWidth ? containerWidth : "100%"}
        height={containerHeight ? containerHeight : 340}
        className={styles.charts_font}
      >
        <LineChart
          data={chartData}
          margin={{ top: 30, right: 40, left: 15, bottom: 5 }}
        >
          <CartesianGrid vertical={false} stroke="#6d7f92" strokeWidth={0.2} />
          <XAxis
            name={dataKeyX}
            dataKey={dataKeyX}
            height={50}
            interval={0}
            padding={{ left: 30, right: 30 }}
            type="category"
            tick={<CustomizedXAxisTick />}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={<CustomizedYAxisTick currency={currency} />}
            axisLine={false}
            tickLine={false}
            type={"number"}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={containerHeight ? 20 : 70}
            // align={"center"}
            iconType={"square"}
            iconSize={12}
            layout={containerHeight ? "horizontal" : "vertical"}
            wrapperStyle={{
              left: 42,
              top: 0,
              fontWeight: 300,
              fontSize: "14px"
            }}
          />
          <ReferenceLine y={0} stroke="#6d7f9271" />

          {dataKeysY.map((item, i) => {
            return (
              <Line
                key={i}
                name={legendLabels[i]}
                type="monotone"
                dataKey={dataKeysY[i]}
                stroke={colors[i]}
                fill={colors[i]}
                dot={{ fill: colors[i], strokeWidth: 4 }}
                strokeWidth={2.5}
                animationEasing={"ease-in-out"}
                animationDuration={800}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
