import React from "react";

import { Table, Spinner } from "reactstrap";

const dateVal = ["created_at", "last_login_at"];

function dateToFormat(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date(date);
  return today.toLocaleDateString(navigator.language, options);
}

export default function AdminTable(props) {
  const { tableHeader, data, loading, error } = props;

  const RenderRow = (props) => {
    return props.keys.map((key, index) => {
      let data =
        dateVal.indexOf(key) > -1
          ? dateToFormat(props.data[key])
          : props.data[key];
      return (
        <td key={props.data[key]}>
          <small>{data}</small>
        </td>
      );
    });
  };

  let getHeaders = (headerData) => {
    return tableHeader.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
  };

  let getKeys = () => {
    return data[0] && Object.keys(data[0]);
  };

  let getRowsData = () => {
    var items = data;
    var keys = getKeys();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  };

  return (
    <>
      {error && (
        <div className="text-center">
          {window.strings.Dashboard_errorOccured || "Some Error occured"}
        </div>
      )}
      {loading && (
        <div className="text-center m-2">
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}
      {data && (
        <Table>
          <thead>
            <tr>{getHeaders()}</tr>
          </thead>
          <tbody>{getRowsData()}</tbody>
        </Table>
      )}
      {data && data.length <= 0 ? (
        <div className="text-center">
          {window.strings.Dashboard_noResultFound || "No result found"}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
