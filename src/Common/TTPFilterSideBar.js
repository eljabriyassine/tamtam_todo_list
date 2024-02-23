import React, { Component } from "react";
import debounce from "lodash.debounce";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import { LIST_PAGE_SIZES, SORT_OPTIONS } from "Config";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";

import moment from "moment";

export default class TTPFilterSideBar extends Component {
  constructor(props) {
    super(props);
    this.handleSearchInputChange = debounce(this.handleSearchInputChange, 1000);
    this.state = {
      filterFormIsVisible: false,
      startDate: null,
      endDate: null,
      focusedInput: "startDate"
    };

    this.pageSizeOptions = LIST_PAGE_SIZES.map(ps => {
      return { label: ps, value: ps };
    });

    this.sortOptions = SORT_OPTIONS.map(({ label, value }) => {
      return { label: label, value: value };
    });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const nav = document.getElementById("cd-filter-container");
    const searchInput = document.getElementById("search-input");
    const navTop = nav.offsetTop;

    if (window.scrollY > navTop + 1) {
      nav.classList.add("is-fixed");
      searchInput.classList.add("right");
    } else {
      nav.classList.remove("is-fixed");
      searchInput.classList.remove("right");
    }
  };

  handleToggleFilterForm() {
    const tmp = !this.state.filterFormIsVisible;
    this.props.filterFormIsVisible(tmp);
    this.setState({ filterFormIsVisible: tmp });
  }

  onInputChange = (inputValue, action, isSimple = false) => {
    let selected = null;
    if (isSimple) {
      selected = inputValue.value + "" || null;
    } else {
      selected = inputValue.map(({ value }) => value);
    }
    action(selected);
  };

  handleResetFilter = () => {
    this.props.handleResetFilter();
  };

  debouncedHandleSearchInputChange(event) {
    this.handleSearchInputChange(event.target.value);
  }

  handleSearchInputChange = searchWord => {
    this.props.handleSearchInputChange(searchWord);
  };

  clearAll = () => {
    document.getElementById("search-input").value = "";
    this.handleSearchInputChange("");
  };

  render() {
    const { filterFormIsVisible } = this.state;
    let {
      searchInputValue,
      pageSize,
      handleListPageSizeChange,
      handleResetFilter,
      filters,
      sort,
      handleListSortChange,
      handleDateRangeChange,
      dateRange,
      language
    } = this.props;
    moment.locale(language);
    return (
      <div id="cd-filter-container" className="cd-main-content">
        <div
          className={`cd-tab-filter-wrapper row ${
            filterFormIsVisible ? "add-margin-left" : ""
          }`}
        >
          <div
            className={`cd-tab-filter ${
              filterFormIsVisible ? "medium-12 column" : "medium-11"
            }`}
          >
            <div className="small-4">
              {pageSize &&
                handleListPageSizeChange && (
                  <Select
                    isSearchable={false}
                    options={this.pageSizeOptions}
                    value={{ label: pageSize, value: pageSize }}
                    onChange={inputValue =>
                      this.onInputChange(
                        inputValue,
                        handleListPageSizeChange,
                        true
                      )
                    }
                    className="ttp-select-page-size"
                    classNamePrefix="ttp-select"
                    components={makeAnimated()}
                  />
                )}
              <a
                className={`cd-filter-trigger button ${
                  filterFormIsVisible ? "filter-is-visible" : ""
                }`}
                onClick={this.handleToggleFilterForm.bind(this)}
              >
                <i className="icon icon-equalizer" />
                {_("filter")}
              </a>
            </div>
            <div className="columns small-4" />
            <div className="small-4">
              <div className="search">
                <span id="search-icon" className="search-submit">
                  <i className="icon-magnifier" />
                </span>
                <input
                  id="search-input"
                  placeholder={_("searchByNameOrVATnumber")}
                  className="search-input"
                  onChange={this.debouncedHandleSearchInputChange.bind(this)}
                />
                {searchInputValue != "" && (
                  <span className="close" onClick={this.clearAll} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`cd-filter ${filterFormIsVisible && "filter-is-visible"}`}
        >
          <div className="scrollable-div">
            <form>
              {handleDateRangeChange &&
                dateRange && (
                  <div className="cd-filter-block">
                    <h4>{_("date range")}</h4>
                    <div className="cd-filter-content">
                      <div className="cd-filters" />
                      <DateRangePicker
                        showClearDates
                        isOutsideRange={day => moment().diff(day) < 0}
                        startDate={dateRange.startDate}
                        startDateId="your_unique_start_date_id"
                        endDate={dateRange.endDate}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={handleDateRangeChange}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput =>
                          this.setState({ focusedInput })
                        }
                        numberOfMonths={1}
                        hideKeyboardShortcutsPanel
                        startDatePlaceholderText={_("start date")}
                        endDatePlaceholderText={_("end date")}
                      />
                    </div>
                  </div>
                )}
              <div className="cd-filter-block">
                <h4>{_("filters")}</h4>
                {filters &&
                  filters.length > 0 &&
                  filters.map(
                    ({ placeholder, options, values, action, isSimple }) => {
                      return (
                        <div key={placeholder} className="cd-filter-content">
                          <div className="cd-filters">
                            <Select
                              isMulti={!isSimple}
                              isSearchable={false}
                              closeMenuOnSelect={false}
                              placeholder={placeholder}
                              options={options}
                              value={options.filter(
                                ({ value }) =>
                                  values &&
                                  (Array.isArray(values)
                                    ? values.includes(value)
                                    : value == values)
                              )}
                              onChange={inputValue =>
                                this.onInputChange(inputValue, action, isSimple)
                              }
                              className="ttp-filter-select"
                              classNamePrefix="ttp-select"
                              components={makeAnimated()}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
              {sort &&
                handleListSortChange && (
                  <div className="cd-filter-block">
                    <h4>{_("sortBy")}</h4>
                    <div className="cd-filter-content">
                      <div className="cd-filters">
                        <Select
                          isSearchable={false}
                          options={this.sortOptions}
                          value={this.sortOptions.filter(s => s.value === sort)}
                          onChange={inputValue =>
                            this.onInputChange(
                              inputValue,
                              handleListSortChange,
                              true
                            )
                          }
                          className="select-page-size"
                          classNamePrefix="ttp-select"
                          components={makeAnimated()}
                        />
                      </div>
                    </div>
                  </div>
                )}
              <a
                className="cd-action cd-close"
                onClick={this.handleToggleFilterForm.bind(this)}
              >
                <img src="/img/close.png" />
              </a>
              <a className="cd-action cd-reset" onClick={handleResetFilter}>
                <img src="/img/reset.png" />
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
