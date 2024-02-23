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
  "#95FFD7",
  "#73B7FF",
  "#25FE4E"
];

export class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, width, value, color } = this.props;
    const offset = 7;

    return (
      <g>
        <text
          x={x + width / 2}
          y={value >= 0 ? y + offset : y - offset}
          fill={color}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
        >
          {value !== "N/A" ? abbreviateNumber(value) : ""}
        </text>
      </g>
    );
  }
}

export class StackedBarChart extends PureComponent {
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
          stackOffset="sign"
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
                barSize={70}
                radius={[2, 2, 2, 2]}
                fill={colors[i]}
                // label={{ position: "center" }}
                animationEasing={"ease-in-out"}
                animationDuration={800}
                minPointSize={2}
                stackId="a"
              >
                {/*{chartData.map((entry, index) => (*/}
                {/*  <Cell key={`cell-${index}`} fill={colors[i]} />*/}
                {/*))}*/}

                <LabelList
                  dataKey={dataKeysY[i]}
                  position={"center"}
                  content={<CustomizedLabel color={"#FFF"} />}
                />
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
