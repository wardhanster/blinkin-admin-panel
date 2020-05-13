import React, { useState, useEffect } from "react";

import AdminTable from "../../lib/AdminTable";
import ButtonGroupDays from "../../lib/ButtonGroupDays";
import useUsersData from "../../lib/hooks/useUsersData";

import Paginator from "../../../utils/Paginator";

import {
  exportCSVFile,
  getFormattedTime
} from "../../lib/hooks/createFileAndDownload";

const inactiveUsersHeader = ["Name", "Email", "Country", "Created At"];

export default function InactiveUsers({ fetchUserData }) {
  const [activeDays, setActiveDays] = useState(0);
  const [pageno, setPageno] = useState(1);
  const [data, setData] = useState(null);

  const { loading, response, error } = useUsersData(
    fetchUserData,
    "inactiveusers",
    activeDays,
    pageno
  );

  useEffect(() => {
    if (response) {
      setData(response);
    }
  }, [response]);

  let setClick = active => {
    setActiveDays(active);
  };

  let onPageChange = count => {
    setPageno(count);
  };

  let pagination = data => {
    if (data && data.records.data.length > 0) {
      return (
        <div className="pull-right">
          <Paginator
            maxClickableCells={5}
            paginatorData={data.records}
            pageNumberSelect={onPageChange}
          />
        </div>
      );
    }
  };

  let downloadFile = () => {
    if (response.records.data.length > 0) {
      var headers = {
        name: "Name",
        email: "Email",
        country: "Country",
        created_at: "Created At"
      };

      var itemsFormatted = [];
      response.records.data.forEach(item => {
        itemsFormatted.push({
          name: item.name,
          email: item.email,
          country: item.country,
          last_login_at: item.created_at
        });
      });

      exportCSVFile(
        headers,
        itemsFormatted,
        `inactive_users_${getFormattedTime()}`
      );
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-3">
            <h6>
              <b>Inactive </b>
            </h6>
          </div>
          <div className="col">
            <ButtonGroupDays
              classUpdate="pull-right"
              activeDays={activeDays}
              setClick={setClick}
            />
            <button
              className="btn btn-sm btn-outline-primary pull-right mr-3"
              onClick={downloadFile}
            >
              <i className="fa fa-download fa-xs" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <AdminTable
          tableHeader={inactiveUsersHeader}
          data={data && data.records.data}
          loading={loading}
          error={error}
        />
        {data && pagination(data)}
      </div>
    </div>
  );
}
