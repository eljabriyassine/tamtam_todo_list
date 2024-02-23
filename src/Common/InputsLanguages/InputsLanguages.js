import React, { Component } from "react";
import inputStyles from "./inputsLanguages.local.scss";
import _ from "i18n";

class InputsLanguages extends Component {
  render() {
    const { componentConfig } = this.props;
    return (
      <div className={inputStyles.slide_title}>
        <div className={inputStyles.labels_form_block}>
          <span className={inputStyles.span_label}>
            <img src={"/img/icons/fr_flag.png"} alt={""} width={22} />
            {_("French")}
          </span>
          <div className={inputStyles.div_input}>
            <input
              type={"text"}
              placeholder={_("frTitle")}
              value={componentConfig.labels ? componentConfig.labels.fr : ""}
              onChange={e => this.props.handleChangeComponentLabels("fr", e)}
              required={true}
            />
            <img src={"/img/icons/pencil.svg"} alt={""} />
          </div>
          <span className={inputStyles.span_label}>
            <img src={"/img/icons/en_flag.png"} alt={""} width={22} />
            {_("English")}
          </span>
          <div className={inputStyles.div_input}>
            <input
              type={"text"}
              placeholder={_("enTitle")}
              value={componentConfig.labels ? componentConfig.labels.en : ""}
              onChange={e => this.props.handleChangeComponentLabels("en", e)}
              required={true}
            />
            <img src={"/img/icons/pencil.svg"} alt={""} />
          </div>
          <span className={inputStyles.span_label}>
            <img src={"/img/icons/nl_flag.png"} alt={""} width={22} />
            {_("Dutch")}
          </span>
          <div className={inputStyles.div_input}>
            <input
              type={"text"}
              placeholder={_("nlTitle")}
              value={componentConfig.labels ? componentConfig.labels.nl : ""}
              onChange={e => this.props.handleChangeComponentLabels("nl", e)}
              required={true}
            />
            <img src={"/img/icons/pencil.svg"} alt={""} />
          </div>
        </div>
      </div>
    );
  }
}
export default InputsLanguages;
