import React, { Component } from "react";
import Dropzone from "react-dropzone";
import _ from "i18n";

export default class DocumentsUploader extends Component {
  render() {
    const { attachments } = this.props;

    return (
      <div className="attachments-container">
        <Dropzone
          className="attachments-dropzone row medium-10"
          ref={node => {
            this.dropzone = node;
          }}
          onDrop={this.props.handleDrop}
          accept={this.props.acceptedFiles}
        >
          <div>
            <img
              src={"/img/icons/cloud-computing.svg"}
              className={"icon-cloud-upload"}
              alt={""}
            />
            {attachments && attachments[0] ? (
              attachments.map((attachment, index) => {
                return (
                  <div key={index}>
                    <p>
                      <span className="icon icon-paper-clip" />{" "}
                      {attachment.name}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: _("dragFiles")
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
