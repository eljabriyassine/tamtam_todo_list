import React, { Component } from "react";
import Percentage from "../Percentage/Percentage";
import { number_format } from "Utils";
import { Table } from "antd";

class BalanceSheetTable extends Component {
  constructor(props) {
    super(props);

    const {
      componentData: { expandedKeys }
    } = this.props;

    this.state = {
      expandedKeys: expandedKeys
    };
  }

  onExpand = (expanded, { code }) => {
    const keys = this.state.expandedKeys;
    const expandedKeys = expanded
      ? keys.concat(code)
      : keys.filter(k => k !== code);
    this.setState({ expandedKeys });
  };

  onRow = ({ code }) =>
    this.state.expandedKeys.includes(code) && {
      className: "expanded-row-level-0"
    };

  //******************   Content Functions END  **************//

  //******************   Content Render functions  ****************//
  renderBalanceSheetTdComponentDiff = diff => {
    return (
      <span className={"balance-sheet-td-percentage"}>
        <Percentage
          percentage={
            diff && Math.abs(diff).toString().length > 5
              ? Math.round(diff)
              : diff
          }
        />
      </span>
    );
  };

  renderBalanceSheetTdComponent = (value, diff, record, year) => {
    // const {
    //   balanceSheetAttachments: { items }
    // } = this.props;
    if (value == null && !diff) {
      return (
        <span className={"balance-sheet-td-component"}>
          <span className={"balance-sheet-td-value"} />
        </span>
      );
    }

    // let item = items.find(
    //   obj => obj.associatedAccount.slice(1) === record.code && obj.year === year
    // );

    return (
      <span
        className={`balance-sheet-td-component ${
          record.type === "indicator_income_statement_level"
            ? "balance-sheet-key-indicator"
            : record.type === "indicator_income_statement_level_treasury"
              ? "balance-sheet-key-indicator-treasury"
              : record.type === "indicator_income_statement_level_treasury_bold"
                ? "balance-sheet-key-indicator-treasury-bold"
                : ""
        }`}
      >
        <span className={"balance-sheet-td-value"}>
          {/*{item ? (*/}
          {/*  <div*/}
          {/*    className={"balance-sheet-td-attachment"}*/}
          {/*    onClick={() => this.displayAnnexePDF(item.id, item.filePath)}*/}
          {/*  >*/}
          {/*    <i className={"icon icon-paper-clip"} />*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  ""*/}
          {/*)}*/}

          {number_format(value, 2, ",", " ")}
        </span>
        {this.renderBalanceSheetTdComponentDiff(diff)}
      </span>
    );
  };

  calculateColumnsWidth = years => {
    return years.length >= 4 ? 195 : years.length === 1 ? 270 : 250;
  };

  renderBalanceSheet = () => {
    const { componentData } = this.props;

    let dataSheet, dataYears, dataModel;

    dataYears = componentData.years;
    dataModel = componentData.balance;

    let years = dataYears ? dataYears : [];
    let columnsTest = [];

    if (years.length) {
      columnsTest = [
        {
          title: "SYNTHETIQUE",
          dataIndex: "label",
          key: "label",
          render: (text, record) => (
            <span
              className={
                record.type === "indicator_income_statement_level"
                  ? "balance-sheet-key-indicator"
                  : record.type === "indicator_income_statement_level_treasury"
                    ? "balance-sheet-key-indicator-treasury"
                    : record.type ===
                      "indicator_income_statement_level_treasury_bold"
                      ? "balance-sheet-key-indicator-treasury-bold"
                      : ""
              }
            >
              <span
                className={
                  text && text.length >= 46 ? "balance-sheet-label-wrap" : ""
                }
              >
                <div>
                  {record.code.slice(0, 2) !== "0_" && (
                    <span className="balance-sheet-accounts-code">
                      {record.code}
                    </span>
                  )}
                  &nbsp;
                  {text}
                </div>
              </span>
            </span>
          ),
          width: 450,
          fixed: "left"
        }
      ];
    }
    for (let i = 0; i < years.length; i++) {
      columnsTest.push({
        title: years[i],
        dataIndex: years[i],
        key: years[i],
        render: (text, record) =>
          this.renderBalanceSheetTdComponent(
            text.value,
            text.diff,
            record,
            years[i]
          ),
        width: this.calculateColumnsWidth(years)
      });
    }

    dataSheet = dataModel ? dataModel : [];

    let tableWidth =
      years.length * this.calculateColumnsWidth(years) + 450 + 20;

    return (
      <div>
        <div className={"rmodal__center"}>
          <Table
            columns={columnsTest}
            dataSource={dataSheet}
            size="small"
            pagination={false}
            // scroll={{ y: 650, x: 1410 }}
            scroll={{ y: 390, x: tableWidth }}
            // defaultExpandAllRows={true}
            onRow={this.onRow}
            onExpand={this.onExpand}
            expandedRowKeys={this.state.expandedKeys}
            rowKey="code"
            bordered={false}
            // rowSelection={rowSelection}
            // style={this.props.embedded ? { margin: "0 0 0 0" } : {}}
          />
        </div>
      </div>
    );
  };

  render() {
    return this.renderBalanceSheet();
  }
}

export default BalanceSheetTable;
