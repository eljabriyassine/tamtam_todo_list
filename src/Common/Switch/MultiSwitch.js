import React, { Component } from "react";
import styles from "./Switch.local.scss";
import classnames from "classnames";

export default class MultiSwitch extends Component {
  static get defaultProps() {
    return {
      onChange: function(value) {}
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: props.selectedValue || props.vals[0]
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.selectedOption !== nextProps.selectedValue) {
      this.setState({ selectedOption: nextProps.selectedValue });
    }
  }

  render() {
    let { labels, vals, name, customClass } = this.props;

    let { selectedOption } = this.state;

    if (!labels || labels.length === 0) {
      return null;
    }

    let returnDiv = [];
    for (let i = 0; i < labels.length; i++) {
      returnDiv.push(
        <li key={`switch-${vals[i]}`} id={"roleSwitch"} className="switch">
          <span className={customClass}>{labels[i]}</span>
          <div className="switch-container">
            <label>
              <input
                value={vals[i]}
                ref="switch"
                name={name}
                checked={
                  Array.isArray(selectedOption)
                    ? false
                    : selectedOption === vals[i]
                }
                onChange={this.handleChange.bind(this)}
                className={classnames(
                  styles.ttp_switch,
                  Array.isArray(selectedOption) &&
                  selectedOption.includes(vals[i])
                    ? styles.neutral
                    : ""
                )}
                type="radio"
              />
              <div>
                <span>
                  <i className="icon icon-toolbar grid-view" />
                </span>
                <span>
                  <i className="icon icon-toolbar ticket-view" />
                </span>
                <div />
              </div>
            </label>
          </div>
        </li>
      );
    }

    return <ul>{returnDiv}</ul>;
  }

  handleChange(e) {
    this.setState({ selectedOption: e.target.value });
    this.props.onChange(e.target.value);
  }
}
