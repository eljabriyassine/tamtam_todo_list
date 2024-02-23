import React, { Component } from "react";
import { connect } from "react-redux";
import DropDownMenu from "./DropDownMenu";
import { Tooltip } from "antd";
import _ from "i18n";

class DropDownActionsList extends Component {
  constructor(props) {
    super(props);

    this.dropDownId = `dropdown-${this.props.shortId}`;

    this.state = { showMenu: false };
    this.handleOpenMenu = () => this.setState({ showMenu: true });
    this.handleCloseMenu = () => this.setState({ showMenu: false });
  }

  static defaultProps = {
    visible: true
  };

  handleToggleMenu = () => {
    if (this.state.showMenu) {
      this.handleCloseMenu();
    } else {
      this.handleOpenMenu();
    }
  };

  render() {
    return (
      <Tooltip placement="top" title={_("externalLinks")} mouseLeaveDelay={0}>
        <div
          className="flex-container float-right"
          style={{ width: this.props.fiche ? "100%" : "" }}
          onClick={e => {
            e.stopPropagation();
            this.handleToggleMenu();
          }}
        >
          <DropDownMenu
            dropDownId={this.dropDownId}
            active={this.state.showMenu}
            onClickAway={this.handleCloseMenu}
            style={{ visibility: this.props.visible ? "visible" : "hidden" }}
            renderDropDownMenuActions={this.props.renderDropDownMenuActions}
          />
        </div>
      </Tooltip>
    );
  }
}

const mapStateToProps = state => ({
  loggedAs: state.auth.loggedAs
});

export default connect(mapStateToProps)(DropDownActionsList);
