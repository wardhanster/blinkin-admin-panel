import React from "react";

import "./dashboard__details.css";

import UsersWithNoCalls from "./UsersWithNoCalls";
import InactiveUsers from "./InactiveUsers";
import MostActiveUsers from "./MostActiveUsers";

export default function DashboardDetail({ fetchUserData }) {
  return (
    <div className="mt-3">
      <div className="row">
        <div className="col">
          <UsersWithNoCalls fetchUserData={fetchUserData} />
        </div>
        <div className="col">
          <InactiveUsers fetchUserData={fetchUserData} />
        </div>
      </div>
      <div className="row mt-3 mb-5">
        <div className="col">
          <MostActiveUsers fetchUserData={fetchUserData} />
        </div>
      </div>
    </div>
  );
}
