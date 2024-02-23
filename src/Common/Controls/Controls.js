import React, { Component } from "react";
import _ from "i18n";
import styles from "./Controls.local.scss";
import { SvgIcon } from "../Icons";

export default class Controls extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { updated, saveCallback } = this.props;

    if (updated) {
      setTimeout(saveCallback, 1000);
    }
  }

  handleCancel() {
    const { onCancel } = this.props;

    if (typeof onCancel === "function") {
      onCancel();
    }

    document
      .getElementsByClassName("mask")
      .item(0)
      .classList.add("hide");
  }

  handleOk() {
    const { dispatch, action } = this.props;
    dispatch(action());
  }

  renderBtnOK() {
    const {
      updating,
      updated,
      ok,
      action,
      successMessage,
      progressMessage,
      disabled
    } = this.props;
    if (updating) {
      return (
        <button className="btn primary">
          {progressMessage ? progressMessage : _("processing")}
          {/*<SvgIcon icon={"CheckAuthorisationIcon"} className={""} />*/}
          <img
            src={"/img/icons/tail-spin.svg"}
            alt={""}
            className={styles.loading}
          />
        </button>
      );
    }
    if (updated) {
      return (
        <button className="btn primary" onClick={() => this.handleCancel()}>
          {successMessage ? successMessage : _("successUpdated")}
          <SvgIcon
            icon={"CheckAuthorisationIcon"}
            className={styles.svg_icons}
          />
        </button>
      );
    }
    return (
      <button className="btn primary" onClick={action} disabled={disabled}>
        {_(ok)}
      </button>
    );
  }

  render() {
    const { label, controlClass } = this.props;

    return (
      <div id="controls" className={controlClass || ""}>
        <button
          className="btn secondary"
          onClick={this.handleCancel.bind(this)}
        >
          {_("cancel")}
        </button>
        <div className={styles.controls__label}>{label}</div>
        {this.renderBtnOK()}
      </div>
    );
  }
}
