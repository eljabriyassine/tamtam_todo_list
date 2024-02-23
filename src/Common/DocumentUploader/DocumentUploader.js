import React, { Component } from "react";
import Dropzone from "react-dropzone";
import _ from "i18n";
import { BALANCE_MODELS_CONFIG } from "Config";

export default class DocumentUploader extends Component {
  render() {
    const { attachment, sourceModel } = this.props;

    return (
      <div className="attachments-container">
        <Dropzone
          className="attachments-dropzone row medium-10"
          ref={node => {
            this.dropzone = node;
          }}
          // style={{
          //   backgroundImage: `url(${attachment ? attachment.preview : ""})`
          // }}
          onDrop={this.props.handleDrop}
          multiple={
            BALANCE_MODELS_CONFIG[sourceModel] &&
            BALANCE_MODELS_CONFIG[sourceModel].years === 0
          }
          accept={this.props.acceptedFiles}
        >
          <div>
            <img
              src={"/img/icons/cloud-computing.svg"}
              className={"icon-cloud-upload"}
              alt={""}
            />
            {/*<span className="icon icon-cloud-upload" />*/}
            {attachment && attachment.length ? (
              attachment.map(item => {
                return (
                  <div>
                    <p>
                      <span className="icon icon-paper-clip" /> {item.name}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: _("dragFile")
                  }}
                />
              </p>
            )}
          </div>
        </Dropzone>
      </div>
    );
  }
}
