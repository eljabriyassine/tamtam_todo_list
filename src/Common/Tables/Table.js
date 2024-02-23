import React, { Component } from "react";
import Percentage from "../Percentage/Percentage";
import styles from "./Tables.local.scss";
import { abbreviateNumber } from "Utils";

class Table extends Component {
  render() {
    const { columns, rows } = this.props;

    return (
      <table className={styles.ttp_table}>
        <thead key={"thead"}>
          <tr>
            <th>
              {/*@todo translate*/}
              Description
            </th>
            {columns.map((col, i) => {
              return <th key={`col-${i}`}>{col}</th>;
            })}
          </tr>
        </thead>
        <tbody key={"tbody"}>
          {rows.map((row, i) => {
            return (
              <tr key={`row-${i}`}>
                <td>{row.label}</td>
                {columns.map((col, i) => {
                  return (
                    <td key={`td-${i}`}>
                      {row[col].value !== "N/A"
                        ? row[col].unit === "€"
                          ? `€ ${abbreviateNumber(row[col].value)}`
                          : `${row[col].value}`
                        : row[col].value}{" "}
                      <Percentage percentage={row[columns[i]].diff} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
