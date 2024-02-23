import React, { Component } from "react";
import debounce from "lodash.debounce";

import _ from "i18n";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: props.value || "" };
    this.handleSearchInputChange = debounce(this.handleSearchInputChange, 1000);
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.onChange(event.target.value);
    }
  };

  debounceSearchHandler = event => {
    this.setState({ inputValue: event.target.value });
    this.handleSearchInputChange(event.target.value);
  };

  handleSearchInputChange = value => {
    this.props.onChange(value);
  };

  clearAll = () => {
    this.setState({ inputValue: "" });
    this.handleSearchInputChange("");
  };

  clearInput = () => {
    this.setState({ inputValue: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { inputValue } = this.state;

    return (
      <div className="search-box">
        <span className="search-box__icon">
          <img src={"/img/icons/search.svg"} alt={""} />
        </span>
        <input
          value={inputValue}
          placeholder={`${_(placeholder || "search")} ...`}
          onChange={this.debounceSearchHandler}
          onKeyPress={this.handleKeyPress}
        />
        {inputValue &&
          inputValue.length && (
            <img
              className="icomoon icon-tt-close"
              src="/img/icons/close.svg"
              alt={""}
              onClick={this.clearAll}
            />
          )}
      </div>
    );
  }
}

export default SearchBox;
