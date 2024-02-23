import React, { Component } from "react";

import { LIST_PAGE_SIZES, LIST_PAGE_SIZES_SLIDES } from "Config";

class PageSize extends Component {
  handlePageSizeChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { pageSize } = this.props;

    return (
      <select
        className="ttp-page-size m-l-s"
        value={pageSize}
        onChange={this.handlePageSizeChange}
      >
        {LIST_PAGE_SIZES_SLIDES.includes(parseInt(pageSize))
          ? LIST_PAGE_SIZES_SLIDES.map((pagesize, index) => (
              <option key={`page-size-${index}`} value={pagesize}>
                {pagesize}
              </option>
            ))
          : LIST_PAGE_SIZES.map((pagesize, index) => (
              <option key={`page-size-${index}`} value={pagesize}>
                {pagesize}
              </option>
            ))}
      </select>
    );
  }
}

export default PageSize;
