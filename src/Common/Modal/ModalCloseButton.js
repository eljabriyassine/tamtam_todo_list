import React from "react";
import { Button } from "antd";

export default class ModalCloseButton extends React.Component {
  render() {
    return (
      <div className="modal-close-button" onClick={this.props.onClose}>
        <Button shape="circle" icon="close" />
      </div>
    );
  }
}
