import React, { useState, useEffect } from "react";

import AdminTable from "../../lib/AdminTable";
import useUsersData from "../../lib/hooks/useUsersData";
import ButtonGroupDays from "../../lib/ButtonGroupDays";
import {
  exportCSVFile,
  getFormattedTime,
} from "../../lib/hooks/createFileAndDownload";

const mostActiveUsersHeader = [
  window?.strings?.Dashboard_name || "Name",
  window?.strings?.Dashboard_email || "Email",
  window?.strings?.Dashboard_country || "Country",
  window?.strings?.Dashboard_lastLoginAt || "Last Login At",
  window?.strings?.Dashboard_callsCount || "Calls Count",
];

export default function MostActiveUsers({ fetchUserData }) {
  const [activeDays, setActiveDays] = useState(0);
  const [data, setData] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { loading, response, error, downloadResponse } = useUsersData(
    fetchUserData,
    "mostactiveUsers",
    activeDays
  );

  useEffect(() => {
    if (response) {
      setData(response.records);
    }
  }, [response]);

  let setClick = (active) => {
    setActiveDays(active);
  };

  let downloadFile = async () => {
    setLoadingBtn(true);
    let downloadResponseData = await downloadResponse();
    if (downloadResponseData.records.length > 0) {
      var headers = {
        name: "Name",
        email: "email",
        country: "country",
        last_login_at: "Last login at",
        calls_count: "Calls Count",
      };

      var itemsFormatted = [];
      downloadResponseData.records.forEach((item) => {
        itemsFormatted.push({
          name: item.name,
          email: item.email,
          country: item.country,
          last_login_at: item.last_login_at,
          calls_count: item.callscount,
        });
      });

      exportCSVFile(
        headers,
        itemsFormatted,
        `most_active_user_${getFormattedTime()}`
      );
      setLoadingBtn(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col">
            <h6>
              <b>{window.strings.Dashboard_mostActive || "Most Active"}</b>
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
          tableHeader={mostActiveUsersHeader}
          data={data}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
