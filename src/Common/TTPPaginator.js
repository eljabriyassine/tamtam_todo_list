import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import _ from "i18n";

export default class TTPPaginator extends Component {
  render() {
    const {
      onPageChange,
      pageSize,
      nbResult,
      cssClass,
      paginationPage
    } = this.props;

    return (
      <ReactPaginate
        previousLabel={_("previous")}
        nextLabel={_("next")}
        breakLabel={<a href="">...</a>}
        breakClassName={""}
        pageCount={Math.ceil(nbResult / pageSize)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        subContainerClassName={`pages pagination ${cssClass}`}
        activeClassName={"current"}
        pageClassName="page"
        forcePage={paginationPage - 1}
      />
    );
  }
}
