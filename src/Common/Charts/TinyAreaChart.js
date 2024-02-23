import React, { PureComponent } from "react";
import { AreaChart, Area } from "recharts";

export class TinyAreaChart extends PureComponent {
  render() {
    const { chartData, dataKeyY, status } = this.props;
    return (
      <AreaChart
        width={200}
        height={60}
        data={chartData}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <Area
          type="monotone"
          dataKey={dataKeyY}
          stroke={status ? `#2495E1` : `#FB1F5B`}
          fill="transparent"
          strokeWidth={2.4}
        />
      </AreaChart>
    );
  }
}
