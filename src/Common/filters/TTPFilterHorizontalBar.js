import React, { Component } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";
import { CSSTransition } from "react-transition-group";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";

import moment from "moment";
import { SORT_OPTIONS, SORT_METRICS_OPTIONS } from "Config";
import _ from "i18n";
import SearchBox from "./SearchBox";
import PageSize from "./PageSize";
import makeAnimated from "react-select/lib/animated";
import { FilterIcon } from "../Icons";
import { Tooltip } from "antd";

export default class TTPFilterHorizontalBar extends Component {
  constructor(props) {
    super(props);
    if (this.props.isOpen) {
      this.state = { filterFormIsVisible: true };
    } else {
      this.state = { filterFormIsVisible: false };
    }
    this.childBox = React.createRef();
    this.sortOptions = SORT_OPTIONS.map(({ label, value }) => {
      return { label: _(label), value: value };
    });
  }

  handleToggleFilterForm() {
    const { filterFormIsVisible } = this.props;
    const isVisible = !this.state.filterFormIsVisible;
    this.setState({ filterFormIsVisible: isVisible });
    if (filterFormIsVisible) {
      filterFormIsVisible(isVisible);
    }
  }

  handleResetFilter = () => {
    this.props.handleResetFilter();
  };

  handleSearchInputChange = word => {
    this.props.handleSearchInputChange(word);
  };

  onInputChange = (inputValue, action, isSimple = false) => {
    let selected = null;
    if (isSimple) {
      selected = inputValue ? inputValue.value + "" : null;
    } else {
      selected = inputValue.map(({ value }) => value);
    }
    action(selected);
  };

  renderFilters = () => {
    let {
      filters,
      asyncFilters,
      sort,
      handleListSortChange,
      // onChange,
      handleDateRangeChange,
      dateRange,
      language
    } = this.props;

    let i = 0;
    let colCount =
      (filters ? filters.length : 0) +
        (asyncFilters ? asyncFilters.length : 0) +
        (handleListSortChange ? 1 : 0) +
        (dateRange && handleDateRangeChange ? 1 : 0) <=
      2
        ? 2
        : 3;

    let filterCols = [];
    for (let j = 0; j < colCount; j++) {
      filterCols[j] = [];
    }

    if (handleListSortChange) {
      filterCols[i++ % colCount].push(
        <div key="sort" className="columns">
          <label>
            <span className="lbl">{_("sortBy")}</span>
            <Select
              isSearchable={false}
              isClearable={true}
              placeholder={_("sortBy")}
              options={SORT_METRICS_OPTIONS}
              value={filterValues(SORT_METRICS_OPTIONS, sort)}
              onChange={inputValue =>
                this.onInputChange(inputValue, handleListSortChange, true)
              }
              className="ttp-select filled-box uppercase"
              classNamePrefix="ttp-select"
              components={makeAnimated()}
            />
          </label>
        </div>
      );
    }

    if (asyncFilters && asyncFilters.length > 0) {
      asyncFilters.forEach(
        ({ placeholder, loadSuggestions, handleChange, value, isSimple }) => {
          let options = {
            isMulti: !isSimple,
            cacheOptions: "true",
            closeMenuOnSelect: "false",
            placeholder: _(placeholder),
            onChange: handleChange,
            className: "ttp-select",
            classNamePrefix: "ttp-select",
            styles: isSimple
              ? colourStyles.option(null, { data: { color: null } })
              : colourStyles
          };
          if (value) {
            options.value = value;
          }
          filterCols[i++ % colCount].push(
            <div key={placeholder} className="columns">
              <label>
                <span className="lbl">{_(placeholder)}</span>
                <AsyncSelect
                  {...options}
                  defaultOptions
                  loadOptions={loadSuggestions}
                  isClearable={isSimple}
                  className={`ttp-select ${
                    /*  value && value.length > 0 ? "" : "empty-box"*/
                    value && value.length > 0
                      ? isSimple
                        ? "filled-box"
                        : ""
                      : "empty-box"
                  }`}
                />
              </label>
            </div>
          );
        }
      );
    }

    if (filters && filters.length > 0) {
      filters.forEach(
        ({ placeholder, options, values, action, isSimple, isRefresh }) => {
          filterCols[i++ % colCount].push(
            <div key={placeholder} className={`columns`}>
              <label key={placeholder}>
                <span className="lbl">{_(placeholder)}</span>
                {isRefresh && (
                  <Tooltip
                    placement="top"
                    title={_("refresh")}
                    mouseLeaveDelay={0}
                  >
                    <span
                      className="refresh"
                      onClick={() => {
                        this.props.handleDefaultGroupeCRMClientChange();
                      }}
                    >
                      <i className={"icon icon-refresh"} />
                    </span>
                  </Tooltip>
                )}
                <Select
                  isMulti={!isSimple}
                  isSearchable={false}
                  isClearable={true}
                  closeMenuOnSelect={true === isSimple}
                  placeholder={placeholder}
                  options={options}
                  value={filterValues(options, values)}
                  onChange={inputValue =>
                    this.onInputChange(inputValue, action, isSimple)
                  }
                  className={`ttp-select uppercase ${
                    values && values.length > 0
                      ? isSimple
                        ? "filled-box"
                        : ""
                      : "empty-box"
                  }`}
                  classNamePrefix="ttp-select"
                  formatGroupLabel={formatGroupLabel}
                  styles={options[0] && options[0].color && colourStyles}
                />
              </label>
            </div>
          );
        }
      );
    }

    if (handleDateRangeChange && dateRange) {
      moment.locale(language);
      filterCols[i++ % colCount].push(
        <div key={"filter" + i} className="columns">
          <label
            className={
              !dateRange.startDate && !dateRange.endDate
                ? "empty-date-picker"
                : "filled-date-picker"
            }
          >
            <span className="lbl">{_("dateRange")}</span>
            <DateRangePicker
              showClearDates
              isOutsideRange={day => moment().diff(day) < 0}
              startDate={dateRange.startDate}
              startDateId="your_unique_start_date_id"
              endDate={dateRange.endDate}
              endDateId="your_unique_end_date_id"
              onDatesChange={handleDateRangeChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              numberOfMonths={1}
              hideKeyboardShortcutsPanel
              startDatePlaceholderText={_("startDate")}
              endDatePlaceholderText={_("endDate")}
            />
          </label>
        </div>
      );
    }

    return filterCols.map((filters, index) => {
      return (
        <div key={`col-${index}`} className={`small-${colCount === 2 ? 6 : 4}`}>
          {filters}
        </div>
      );
    });
  };

  render() {
    const { filterFormIsVisible } = this.state;
    let {
      customAddOn,
      customAddOnFirst,
      cssClass,
      pageSize,
      handleListPageSizeChange,
      searchPlaceholder,
      handleSearchInputChange,
      selectedTab,
      tabs,
      HideButton,
      onTabChange
    } = this.props;

    return (
      <div
        id="ttp-horizontal-filter"
        className={`${filterFormIsVisible &&
          "ttp-horizontal-filter__open"} ${cssClass}`}
      >
        <div className="filter-wrapper">
          {tabs &&
            tabs.length > 0 && (
              <div className="filter-wrapper__tabs">
                {tabs.map(({ value, label, count, style }) => (
                  <span
                    key={"tab--" + value}
                    // style={color ? { borderColor: color } : {}}
                    onClick={() => onTabChange(value)}
                    style={style}
                    className={`${
                      (selectedTab.length === 0 && value === null) ||
                      selectedTab.some(t => t === value)
                        ? "active"
                        : ""
                    }`}
                  >
                    {_(label)}{" "}
                    {count !== null && count !== undefined ? `(${count})` : ""}
                  </span>
                ))}
              </div>
            )}
          {customAddOnFirst ? customAddOn : ""}
          {handleSearchInputChange && (
            <SearchBox
              ref={this.childBox}
              placeholder={searchPlaceholder}
              onChange={this.handleSearchInputChange}
            />
          )}
          {pageSize && (
            <PageSize pageSize={pageSize} onChange={handleListPageSizeChange} />
          )}
          {!HideButton ? (
            <button
              className="filter-button m-l-s"
              onClick={this.handleToggleFilterForm.bind(this)}
            >
              {_("filter")}
              <FilterIcon className="filter-icon" />
            </button>
          ) : (
            ""
          )}

          {customAddOnFirst ? "" : customAddOn}
        </div>
        <CSSTransition
          in={filterFormIsVisible}
          timeout={200}
          classNames="filter-form"
          unmountOnExit
        >
          <div className="row filter-form">
            {this.renderFilters()}
            <div
              className="filter-close"
              onClick={this.handleToggleFilterForm.bind(this)}
            >
              <img
                className="icomoon icon-tt-close"
                src="/img/icons/close.svg"
                alt={""}
              />
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export const filterValues = (options, values) => {
  if (options && options.length > 0 && options[0].options) {
    options = options.reduce((acc, o) => {
      return acc.concat(o.options);
    }, []);
  }
  return options.filter(
    ({ value }) =>
      values &&
      (Array.isArray(values) ? values.includes(value) : value === values)
  );
};

export const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color;
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color + "22"
            : null,
      color: isDisabled ? "#ccc" : isSelected ? "white" : data.color,
      cursor: isDisabled ? "not-allowed" : "default"
    };
  },
  multiValue: (styles, { data }) => {
    const color = data.color;
    return {
      ...styles,
      backgroundColor: color + "22"
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white"
    }
  })
};

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center"
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);
