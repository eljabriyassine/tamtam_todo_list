import React, { PureComponent } from "react";
import { PieChart, Pie, Sector } from "recharts";

export class SimplePieChart extends PureComponent {
  renderActiveShape = props => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      payload
    } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={4} textAnchor="middle" fill={"#29394D"}>
          {parseInt(payload.percentage, 10) + "%"}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#29394D"}
        />
      </g>
    );
  };

  render() {
    return (
      <PieChart width={this.props.width} height={this.props.width}>
        <Pie
          activeIndex={this.props.activeIndex}
          activeShape={this.renderActiveShape}
          data={this.props.data}
          innerRadius={this.props.scaled ? 100 : 38}
          outerRadius={this.props.scaled ? 122 : 45}
          fill="#F1F2F4"
          dataKey="value"
        />
      </PieChart>
    );
  }
}
