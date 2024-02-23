import React, { Component } from "react";

import _ from "i18n";
import styles from "./PageHeader.local.scss";
import { ArrowLeftIcon } from "../Icons";
import { Button } from "antd";
import { Select } from "antd";
const { Option } = Select;
export default class SettingPageHeader extends Component {
  render() {
    const {
      title,
      name,
      organizationName,
      isSynchro,
      years,
      selectedYear,
      currentPage
    } = this.props;
    return (
      <div className={styles.setting_page_header}>
        {this.props.onBack && (
          <Button key="cancel" onClick={this.props.onBack}>
            <ArrowLeftIcon className={styles.setting_page_header_icon} />
            <div className={styles.setting_page_header_button_label}>
              {_("goBack")}
            </div>
          </Button>
        )}
        <span className={styles.setting_page_header_title}>
          {_(title)}
          {" : "}
        </span>
        <span className={styles.setting_page_header_name}>{name}</span>
        {organizationName}
        {this.props.customAddOn}
        {isSynchro &&
        (currentPage === "DASHBOARD" || currentPage === "FICHECLIENT") ? (
          <Select
            defaultValue={selectedYear}
            id={"select_ant"}
            style={{
              width: 105,
              color: "white",
              height: 35,
              backgroundColor: "#6d7f92",
              padding: "4px",
              borderRadius: "19px",
              marginTop: "2.5px",
              marginLeft: "auto",
              marginRight: 0
            }}
            onChange={value => this.props.handleChangeYear(value)}
          >
            {years.map((item, i) => {
              return (
                <Option value={item} key={i}>
                  {item}
                </Option>
              );
            })}
          </Select>
        ) : (
          ""
        )}
      </div>
    );
  }
}
