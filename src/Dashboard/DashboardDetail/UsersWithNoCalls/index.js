import React, { useState, useEffect } from "react";

import AdminTable from "../../lib/AdminTable";
import ButtonGroupDays from "../../lib/ButtonGroupDays";
import useUsersData from "../../lib/hooks/useUsersData";
import Paginator from "../../../utils/Paginator";

import {
  exportCSVFile,
  getFormattedTime
} from "../../lib/hooks/createFileAndDownload";

const usersWithNoCallsHeader = ["Name", "Email", "Country", "Last Login At"];

export default function UsersWithNoCalls({ fetchUserData }) {
  const [data, setData] = useState(null);
  const [pageno, setPageno] = useState(1);
  const [activeDays, setActiveDays] = useState(0);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { loading, response, error, downloadResponse } = useUsersData(
    fetchUserData,
    "userswithnocalls",
    activeDays,
    pageno,
    false
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

  let downloadFile = async () => {
    setLoadingBtn(true);
    let downloadResponseData = await downloadResponse();

    if (downloadResponseData.records.data.length > 0) {
      var headers = {
        name: "Name",
        email: "Email",
        country: "Country",
        created_at: "Created At"
      };

      var itemsFormatted = [];
      downloadResponseData.records.data.forEach(item => {
        itemsFormatted.push({
          name: item.name,
          email: item.email,
          country: item.country,
          last_login_at: item.last_login_at
        });
      });

      exportCSVFile(headers, itemsFormatted, `no_calls_${getFormattedTime()}`);
      setLoadingBtn(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body dashboard_cardbody">
        <div className="row mb-3">
          <div className="col-3">
            <h6>
              <b>No Calls</b>
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
              disabled={loadingBtn}
            >
              {loadingBtn ? (
                <span class="spinner-border spinner-border-sm"></span>
              ) : (
                <i className="fa fa-download fa-xs" aria-hidden="true"></i>
              )}
            </button>
          </div>
        </div>
        <AdminTable
          tableHeader={usersWithNoCallsHeader}
          data={data && data.records.data}
          loading={loading}
          error={error}
        />
        {data && pagination(data)}
      </div>
    </div>
  );
}
