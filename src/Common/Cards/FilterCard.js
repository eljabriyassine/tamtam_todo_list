import React from "react";
import { Card } from "antd";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

import styles from "./FilterCard.local.scss";
import classnames from "classnames";

import { ICONS, SvgIcon } from "../Icons";
import _ from "i18n";

export const FilterCard = props => {
  const {
    isActive,
    onClick,
    title,
    totalNumber,
    color,
    isGeneric,
    percentage,
    generalTotalNumber,
    generalFolderNumber,
    isFiltred
  } = props;

  return (
    <div className="cell medium-3">
      <Card
        isActive={isActive}
        onClick={onClick}
        isGeneric={isGeneric}
        color={color}
        className={classnames(
          styles.cardsContent,
          isActive ? styles.cardActivated : ""
        )}
        style={{ "--hover-color": color }}
      >
        {isGeneric ? (
          <div
            className={classnames(
              "grid-x align-center card-body",
              styles.cardBodyGeneric
            )}
          >
            <div className="cell medium-10">
              <p className="card-title">{_("total")}</p>
              <p className="card-text">{title}</p>
            </div>
            <div className="cell medium-2">
              <p className={styles.labelNumber}>
                {totalNumber}{" "}
                {isFiltred && (
                  <span className={styles.generalTotalNumber}>
                    / {generalTotalNumber}
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div
              className={classnames(
                "grid-x align-center card-body",
                styles.cardBody
              )}
            >
              <div className="cell medium-10">
                <p className="card-title">{title}</p>
                <p className={styles.labelNumber}>
                  {totalNumber}{" "}
                  {isFiltred && (
                    <span className={styles.generalFolderNumber}>
                      / {generalFolderNumber}
                    </span>
                  )}
                </p>
              </div>
              <div className="cell medium-2">
                <SvgIcon
                  icon={ICONS.FolderFilter}
                  className={styles.folderIcon}
                  color={color}
                />
              </div>
            </div>
            <div className={styles.progressBar}>
              <ProgressBar
                percent={percentage}
                filledBackground={color}
                height={7}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
