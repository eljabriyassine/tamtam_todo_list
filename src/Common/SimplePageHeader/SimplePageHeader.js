import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import browserHistory from "history/createBrowserHistory";

import { Select, Button } from "antd";
import { ArrowLeftIcon, SvgIcon } from "../Icons";
import styles from "./SimplePageHeader.local.scss";

class SimplePageHeader extends Component {
  render() {
    const {
      closePage,
      title,
      secondaryButton,
      primaryButton,
      extraInfos
    } = this.props;
    let defaultYear = browserHistory().location.search;
    let inPresentation = browserHistory().location.pathname.includes(
      "prepare-presentation"
    );
    const { Option } = Select;
    return (
      <div className={styles.viewer_actions}>
        <div className={styles.close_icon}>
          <Button
            key="cancel"
            style={{
              padding: "3px 10px",
              marginRight: 5,
              alignItems: "center",
              color: "#6D7F92",
              background: "#F8F9FA",
              border: "1px solid #B2BCC6",
              boxSizing: "border-box",
              borderRadius: "5px"
            }}
            onClick={closePage}
          >
            <ArrowLeftIcon width={12} height={24} />
          </Button>
          <h4>{title}</h4>
          {extraInfos &&
            extraInfos.years &&
            inPresentation && (
              <Select
                defaultValue={
                  defaultYear && defaultYear.includes("year")
                    ? extraInfos.years.includes(
                        parseInt(
                          defaultYear.replace("?year=", "").slice(0, 4),
                          10
                        )
                      )
                      ? defaultYear.replace("?year=", "").slice(0, 4)
                      : extraInfos.years[0]
                    : extraInfos.years[0]
                }
                style={{ width: 100, marginLeft: 10 }}
                onChange={this.props.handleYearChange}
              >
                {extraInfos.years.map(year => {
                  return <Option value={year}>{year}</Option>;
                })}
              </Select>
            )}
        </div>

        <div>
          {secondaryButton && (
            <button
              className={styles.secondary_button}
              onClick={secondaryButton.action}
              disabled={secondaryButton.isDisabled}
            >
              {secondaryButton.icon && (
                <SvgIcon
                  icon={secondaryButton.icon}
                  className={classnames(styles.icon)}
                />
              )}
              {secondaryButton.label}
            </button>
          )}
          {primaryButton && (
            <button
              className={styles.primary_button}
              onClick={!primaryButton.saving ? primaryButton.action : null}
              disabled={primaryButton.isDisabled}
            >
              {primaryButton.icon && (
                <i className={`icon-left ${primaryButton.icon}`} />
              )}
              <img
                src={"/img/icons/tail-spin.svg"}
                alt={""}
                className={primaryButton.saving ? styles.loading : ""}
              />
              {primaryButton.label}
            </button>
          )}
        </div>
      </div>
    );
  }
}

// Connected Component
const mapStateToProps = state => ({
  extraInfos: state.dashboard.data.extraInfos
});

export default connect(mapStateToProps)(SimplePageHeader);
