import React, { Component } from "react";
import styles from "./Switch.local.scss";

export default class Switch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isChecked !== nextProps.isChecked) {
      this.setState({ isChecked: !this.state.isChecked });
    }
  }

  render() {
    let { name } = this.props;

    return (
      <div className="switch-container">
        <label>
          <input
            ref="switch"
            name={name}
            checked={this.state.isChecked}
            onChange={this._handleChange}
            className={styles.ttp_switch}
            type="checkbox"
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
    );
  }

  _handleChange = () => {
    this.setState({ isChecked: !this.state.isChecked }, () => {
      this.props.onChange(this.state.isChecked);
    });
  };
}
