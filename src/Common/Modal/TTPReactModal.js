import React from "react";
import Modal from "react-modal";
import styles from "./TTPReactModal.local.scss";
import classnames from "classnames";

export const TTPReactModal = props => {
  const {
    isOpen,
    onCancel,
    onConfirm,
    title,
    inProcess,
    children,
    footer,
    extraSlideModal,
    associateModal
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      inProcess={inProcess}
      onConfirm={onConfirm}
      onCancel={onCancel}
      className={{
        base: classnames(
          styles.modalContent,
          extraSlideModal ? styles.extraSlidesModal : "",
          associateModal ? styles.associateModal : ""
        ),
        afterOpen: styles.modalContentAfterOpen,
        beforeClose: styles.modalContentBeforeClose
      }}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <p className={styles.headerTitle}>{title}</p>
        </div>
        <div className={styles.close} onClick={onCancel}>
          <img src="/img/icons/close.svg" alt={""} />
        </div>
        <div
          className={classnames(
            styles.modalBody,
            extraSlideModal ? styles.extraSlidesModal : "",
            associateModal ? styles.associateModal : ""
          )}
        >
          {children}
        </div>
        {footer ? <div className={styles.modalFooter}>{footer}</div> : ""}
      </div>
    </Modal>
  );
};
