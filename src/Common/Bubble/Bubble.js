import React, { Component } from "react";
import _ from "i18n";

export default class Bubble extends Component {
  render() {
    let {
      onBubbleClick,
      label,
      icon,
      isActive,
      cssClass,
      svgIcon
    } = this.props;
    return (
      <div
        onClick={onBubbleClick}
        className={`${cssClass} ${isActive && "active"} bubble-div`}
      >
        {icon ? <i className={`icon ${icon}`} /> : svgIcon}
        <span className={`${svgIcon && "padding-left"}`}>{_(label)}</span>
      </div>
    );
  }
}
