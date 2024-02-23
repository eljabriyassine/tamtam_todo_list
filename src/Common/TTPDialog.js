import React, { Component } from "react";
import _ from "i18n";
import { QuestionIcon } from "../Common/Icons";
import TTPModal from "../Common/Modal/TTPModal";
import ModalCloseButton from "../Common/Modal/ModalCloseButton";

export default class TTPDialog extends Component {
  proceed = () => {
    let { TTPDialog } = this.props;
    let approvedAction = TTPDialog.approvedAction;
    if (approvedAction) {
      approvedAction();
    }
  };

  abort = () => {
    let { TTPDialog } = this.props;
    let abortAction = TTPDialog.abortAction;
    if (abortAction) {
      abortAction();
    }
  };

  render() {
    let { TTPDialog, showDialog, loading, closable } = this.props;
    if (!showDialog) {
      return null;
    }

    let modalMessage = TTPDialog.message || _("defaultDialogMessage");
    let modalProceedBtnLabel = TTPDialog.proceedBtnLabel || _("validate");
    let modalAbortBtnLabel = TTPDialog.abortBtnLabel || _("cancel");
    const modalType = TTPDialog.type ? TTPDialog.type : "primary";
    const icon = TTPDialog.icon || <QuestionIcon />;
    const title = TTPDialog.title || "Confirmation";

    return (
      <TTPModal
        visible={showDialog}
        onClose={this.abort}
        width={600}
        footer={null}
        closable={closable}
      >
        <div className="ttp-alert-dialog">
          <ModalCloseButton onClose={this.abort} />
          <div className={`row alert-header align-center header-${modalType}`}>
            <div className="icon-container">{icon}</div>
            <p className="alert-header__title">{_(title)}</p>
          </div>
          <div className="row align-center">
            <div className="column small-10 ">
              <p className="alert-message">{modalMessage}</p>
            </div>
          </div>
          <div className="row alert-footer align-center">
            <button onClick={this.abort} className="cancel-button button">
              {modalAbortBtnLabel}{" "}
            </button>
            {TTPDialog.approvedAction && (
              <button
                onClick={this.proceed}
                disabled={loading}
                className={`ok-button  button bg-${modalType}`}
              >
                {loading && (
                  <i
                    aria-label="icon: loading"
                    className="anticon anticon-loading"
                    style={{ marginRight: 5 }}
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      focusable="false"
                      className="anticon-spin"
                      data-icon="loading"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 						72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 						40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                    </svg>
                  </i>
                )}
                <span>{modalProceedBtnLabel}</span>
              </button>
            )}
          </div>
        </div>
      </TTPModal>
    );
  }
}
