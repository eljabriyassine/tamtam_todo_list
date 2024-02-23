import React, { PureComponent } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  // Rectangle,
  // LabelList,
  ResponsiveContainer,
  BarChart,
  Bar,
  // Cell,
  Legend,
  Tooltip,
  LabelList,
  ReferenceLine
} from "recharts";
import styles from "./Charts.local.scss";
import {
  CustomizedXAxisTick,
  CustomizedYAxisTick,
  CustomTooltip
} from "./Common";
import { abbreviateNumber } from "Utils";

const colors = [
  "#2495E1",
  "#F84154",
  "#FA9437",
  "#06d9b1",
  "#73B7FF",
  "#95FFD7"
  // "#2495E1",
  // "#73B7FF",
  // "#F84154",
  // "#FE5C3D",
  // "#FA9437",
  // "#D0A679",
  // "#06d9b1",
  // "#95FFD7",
  // "#F7953E"
];

export class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, width, value, color } = this.props;
    const offset = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y ? (value >= 0 ? y - offset : y + offset) : 0}
          fill={color}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10.5}
        >
          {value !== "N/A" ? abbreviateNumber(value) : ""}
        </text>
      </g>
    );
  }
}

export class StandardBarChart extends PureComponent {
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
        <BarChart
          data={chartData}
          margin={{ top: 15, right: 40, left: 15, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#6d7f92" strokeWidth={0.2} />
          <XAxis
            name={dataKeyX}
            dataKey={dataKeyX}
            height={50}
            interval={0}
            padding={{ left: 20, right: 20 }}
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
          <Tooltip
            cursor={{ fill: "#f3faff", opacity: 0.6 }}
            content={<CustomTooltip />}
          />
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
              <Bar
                key={i}
                name={legendLabels[i]}
                type="monotone"
                dataKey={dataKeysY[i]}
                barSize={65}
                radius={[4, 4, 4, 4]}
                fill={colors[i]}
                // label={{ position: "top" }}
                animationEasing={"ease-in-out"}
                animationDuration={800}
                minPointSize={2}
              >
                {/*{chartData.map((entry, index) => (*/}
                {/*  <Cell key={`cell-${index}`} fill={colors[i]} />*/}
                {/*))}*/}
                <LabelList
                  dataKey={dataKeysY[i]}
                  content={<CustomizedLabel color={colors[i]} />}
                />
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
