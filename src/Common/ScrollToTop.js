import { Component } from "react";
import PropTypes from "prop-types";

export default class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      $("html, body").animate({ scrollTop: 0 });
    }
  }

  render() {
    return this.props.children;
  }
}
