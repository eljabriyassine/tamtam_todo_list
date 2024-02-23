import React, { Component } from "react";
import styles from "./SidePageHeader.local.scss";
import classnames from "classnames";
import _ from "i18n";

export default class SidePageHeader extends Component {
  render() {
    const {
      app,
      subHeader,
      tabContainer,
      withReturnButton,
      handleReturnTo
    } = this.props;

    return (
      <div
        className={classnames(
          styles.side_page_header,
          tabContainer ? styles.absolute : ""
        )}
      >
        {withReturnButton ? (
          <div className={styles.side_page_header__info}>
            <button type={"button"} onClick={handleReturnTo}>
              <img src="/img/icons/Arrow.svg" alt={""} /> {_("return")}
            </button>

            <p className={styles.sub_header}> {_(subHeader)} </p>
          </div>
        ) : (
          <div className={styles.side_page_header__info}>
            <p> {_(app)} </p>
            <img src="/img/icons/Arrow.svg" alt={""} />
            <p className={styles.sub_header}> {_(subHeader)} </p>
          </div>
        )}
      </div>
    );
  }
}
