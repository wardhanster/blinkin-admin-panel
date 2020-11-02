import React, { useEffect, useState } from "react";
import DashboardHeaderCount from "./DashboardHeaderCount";
import DashboardDetail from "./DashboardDetail";
import DashboardMetrics from "./DashboardMetrics";

import { Container } from "reactstrap";

export default function DashboardMain({
  fetchData,
  fetchUserData,
  fetchMetrics,
}) {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function CallAPI() {
      let res = await fetchMetrics();
      if (res.success) {
        setResponseData(res);
      }
    }
    CallAPI();
  }, [fetchMetrics]);

  const updateFilter = async (filterData) => {
    let res = await fetchMetrics(filterData);
    setResponseData(res);
  };

  return (
    <Container className="mt-3">
      <DashboardHeaderCount fetchData={fetchData} />
      <DashboardDetail fetchUserData={fetchUserData} />
      {responseData ? (
        <DashboardMetrics
          updateFilter={updateFilter}
          responseData={responseData}
        />
      ) : null}
    </Container>
  );
}
