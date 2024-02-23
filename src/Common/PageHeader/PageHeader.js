import React, { Component } from "react";

import _ from "i18n";
import styles from "./PageHeader.local.scss";
// import { SVG_ICONS } from "Config";
import { SvgIcon } from "../Icons";

export default class PageHeader extends Component {
  render() {
    const { header, subHeader, cssClass, icon, children } = this.props;

    return (
      <div className={`${styles.page_header} ${cssClass || ""}`}>
        <div className={styles.page_header__icon}>
          {/*<img src={"/img/icons/" + SVG_ICONS[icon] || "EMAIL.svg"} alt={""} />*/}
          <SvgIcon icon={icon} className={""} />
        </div>
        <div className={styles.page_header__info}>
          <div>
            <h3>{_(header)}</h3>
            <p>{_(subHeader)}</p>
          </div>
        </div>
        <div className={styles.page_header__children}>{children}</div>
      </div>
    );
  }
}
