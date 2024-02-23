import React, { PureComponent } from "react";
import { PieChart, Pie, Sector } from "recharts";

export class TwoValuePieChart extends PureComponent {
  prepareData = () => {
    let data = [this.props.data.main, this.props.data.base];
    data[0].baseName = this.props.data.base.name;

    return data;
  };

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
        <text
          x={cx}
          y={cy}
          dy={0}
          textAnchor="middle"
          fill={"#18A0FB"}
          fontSize={this.props.scaled ? 28 : 25}
          // font-size="25"
        >
          {payload.percentage + "%"}
        </text>
        <text
          x={cx}
          y={cy}
          dy={18}
          textAnchor="middle"
          fill={"#18A0FB"}
          fontSize={this.props.scaled ? 15 : 12}
        >
          {"de " + payload.baseName + " "}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#18A0FB"}
        />
      </g>
    );
  };
  render() {
    return (
      <PieChart width={this.props.width} height={this.props.width}>
        <Pie
          activeIndex={0}
          activeShape={this.renderActiveShape}
          data={this.prepareData()}
          innerRadius={this.props.scaled ? 100 : 58}
          outerRadius={this.props.scaled ? 122 : 70}
          fill="#C7E8FE"
          paddingAngle={1}
        />
      </PieChart>
    );
  }
}
