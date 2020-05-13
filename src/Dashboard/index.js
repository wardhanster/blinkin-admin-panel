import React from "react";

import DashboardHeaderCount from "./DashboardHeaderCount";
import DashboardDetail from "./DashboardDetail";

import { Container } from "reactstrap";

export default function DashboardMain({ fetchData, fetchUserData }) {
  return (
    <Container className="mt-3">
      <DashboardHeaderCount fetchData={fetchData} />
      <DashboardDetail fetchUserData={fetchUserData} />
    </Container>
  );
}