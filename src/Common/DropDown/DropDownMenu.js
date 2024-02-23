import React, { Component } from "react";
import { connect } from "react-redux";

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  static defaultProps = {
    style: { visibility: "visible" }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target) &&
      !event.target.closest(".reveal")
    ) {
      this.props.onClickAway();
    }
  };

  render() {
    return (
      <div
        className={`drop-down-option accounting__drop-down ${
          this.props.active ? "accounting__drop-down--hover" : ""
        }`}
        data-dropdown-menu
        id={this.props.dropDownId}
        ref={this.wrapperRef}
        style={this.props.style}
      >
        <span className="icon-options icon-globe opens-left accounting__drop-down--icon" />
        {this.props.active && this.props.renderDropDownMenuActions()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedAs: state.auth.loggedAs,
  currentClient: state.auth.currentClient,
  user: state.auth.user
});

export default connect(mapStateToProps)(DropDownMenu);
