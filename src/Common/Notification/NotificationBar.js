import React from "react";
import styles from "./NotificationBar.local.scss";
import classnames from "classnames";
import { CrossIcon, CheckMarkCircleIcon } from "../Icons";
import _ from "i18n";
export const NotificationBar = props => {
  const { message, theme, onClose, onSeeMore, isUaNotification } = props;
  return (
    <div
      className={classnames(
        styles.wrapper,
        "grid-x align-middle",
        theme && styles[theme]
      )}
    >
      <div
        className={classnames(
          styles.message,
          "col small-11",
          theme && styles[theme]
        )}
      >
        <div className={classnames((styles.icon, "m-r-s"))}>
          {!isUaNotification && <CheckMarkCircleIcon className={styles.icon} />}
        </div>
        <span>{message} </span>
        {onSeeMore && (
          <span onClick={onSeeMore} className={styles.seeMore}>
            {_("seeMore")}
          </span>
        )}
        {isUaNotification && (
          <a className={styles.seeMore} href="https://unitedassociates.be/">
            United Associates
          </a>
        )}
      </div>
      {!isUaNotification && (
        <div
          className={classnames(styles.close_icon, "col small-1")}
          onClick={onClose}
        >
          <CrossIcon width={11} height={11} color="#29394D" />
        </div>
      )}
    </div>
  );
};
