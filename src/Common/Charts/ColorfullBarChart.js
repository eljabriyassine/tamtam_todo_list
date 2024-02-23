import React, { PureComponent } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  // Legend,
  // Rectangle,
  // LabelList,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LabelList,
  ReferenceLine
} from "recharts";
import styles from "./Charts.local.scss";
import { CustomizedXAxisTick, CustomizedYAxisTick } from "./Common";
import { number_format } from "Utils";

export class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, width, value, color } = this.props;
    const offset = 8;

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
          {value !== "N/A" ? number_format(value, 2, ",", " ") : ""}
        </text>
      </g>
    );
  }
}

export class ColorfullBarChart extends PureComponent {
  render() {
    const {
      chartData,
      dataKeyY,
      dataKeyX,
      currency,
      // legendLabels,
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
          margin={{ top: 30, right: 30, left: 8, bottom: -10 }}
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
          <ReferenceLine y={0} stroke="#6d7f9271" />

          <Bar
            dataKey={dataKeyY}
            barSize={70}
            radius={[5, 5, 5, 5]}
            // label={{ position: "top" }}
            animationEasing={"ease-in-out"}
            animationDuration={2500}
          >
            {chartData.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item["color"]} />
            ))}
            <LabelList
              dataKey={dataKeyY}
              content={<CustomizedLabel chartData={chartData} />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
