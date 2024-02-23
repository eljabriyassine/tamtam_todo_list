import React, { Component } from "react";
import _ from "i18n";

class TTPTab extends Component {
  selectTab = (ev, tabId) => {
    ev.preventDefault();
    this.props.selectTab(tabId);
  };

  render() {
    const { tabs, activeTab, isDisabled } = this.props;

    return (
      <div className="ttp-tab-selector">
        <nav>
          {tabs.map(tab => {
            return (
              <button
                key={tab.id}
                href="#"
                className={`${activeTab === tab.id ? "active" : ""}`}
                onClick={ev => this.selectTab(ev, tab.id)}
                disabled={isDisabled}
              >
                {_(tab.label)}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }
}

export default TTPTab;
