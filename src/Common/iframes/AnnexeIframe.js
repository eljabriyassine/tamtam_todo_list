import React, { Component } from "react";
import classnames from "classnames";
import styles from "./iframes.local.scss";
import NotFoundV2 from "../../NotFound/NotFoundV2";

class AnnexeIframe extends Component {
  render() {
    const {
      hideIframe,
      srcIframe,
      loadingIframe,
      onCloseIframe,
      isNotFound
    } = this.props;

    if (hideIframe) {
      return null;
    }

    return (
      <div>
        <iframe
          id={"annexe-iframe"}
          name={"annexe-iframe"}
          title={"annexe attachment"}
          src={srcIframe || ""}
        />
        <div
          className={classnames(styles.iframe_close)}
          onClick={onCloseIframe}
        >
          <img src="/img/icons/close.svg" alt={""} />
        </div>
        {loadingIframe && (
          <div className={styles.iframe_loading}>
            <img src={"/img/Ripple-1s-150px.svg"} alt="" />
          </div>
        )}
        {isNotFound && (
          <div className={styles.iframe_not_found}>
            <NotFoundV2
              errorPageType={"ACCESS_DENIED"}
              text={"annexeNotAvailable"}
              buttonIgnored={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AnnexeIframe;
