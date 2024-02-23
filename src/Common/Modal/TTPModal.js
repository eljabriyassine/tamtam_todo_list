import React, { Component } from "react";
import { Modal } from "antd";

class TTPModal extends Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleCancel}
        onCancel={this.props.handleCancel}
        width={this.props.width}
        footer={this.props.footer}
        closable={this.props.closable}
        style={this.props.modalStyle}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default TTPModal;
