import React, { Component } from "react";

class TTPFilterTabs extends Component {
  render() {
    const { tabs, activeTabs, toggleTab } = this.props;

    return (
      <div className="ttp-tabs">
        {tabs &&
          tabs.map(({ label, value, abbr }) => (
            <div
              key={value[0]}
              className={`ttp-tabs__tab ${
                activeTabs.some(t => t === value[0]) ? "is-active" : ""
              }`}
              onClick={() => toggleTab(value)}
            >
              <span className={"ttp-tabs__tab__label"}>{label}</span>
              <span className={"ttp-tabs__tab__abbr"}>{abbr}</span>
            </div>
          ))}
      </div>
    );
  }
}

export default TTPFilterTabs;
