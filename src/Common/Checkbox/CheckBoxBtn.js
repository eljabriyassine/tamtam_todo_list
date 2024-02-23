import React, { Component } from "react";

class CheckBoxBtn extends Component {
  render() {
    const { onChange, disabled, checked, label, labelClass } = this.props;
    const id = this.props.id;

    return (
      <div className="check-box-container">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={
            !disabled && onChange ? e => onChange(e.target.checked) : null
          }
        />
        <label htmlFor={id} className={`check-box ${labelClass}`} />
        <span>{label || ""}</span>
      </div>
    );
  }
}

export default CheckBoxBtn;
