import React, { useState, useCallback } from "react";

import "./dashboard__header__count.css";

import useDashboard from "../lib/hooks/useDashboard";

import { Row, Col, Spinner } from "reactstrap";

export default function DashboardHeaderCount({ fetchData }) {
  let [activeDays, setActiveDays] = useState(0);
  let { loading, response, error } = useDashboard(fetchData, activeDays);

  let handleBtnClick = useCallback((data) => {
    setActiveDays(data);
  }, []);

  return (
    <div className="dashboard__container">
      <div className="card">
        <div className="card-body">
          <Row className="mb-4">
            <Col>
              <div className="btn-group  btn-group-sm pull-right">
                <button
                  type="button"
                  className={
                    activeDays === 1
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => handleBtnClick(1)}
                >
                  {window.strings.Dashboard_yesterday || "Yesterday"}
                </button>
                <button
                  type="button"
                  className={
                    activeDays === 7
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => handleBtnClick(7)}
                >
                  7 {window.strings.Dashboard_days || "Days"}
                </button>
                <button
                  type="button"
                  className={
                    activeDays === 30
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => handleBtnClick(30)}
                >
                  30 {window.strings.Dashboard_days || "Days"}
                </button>
                <button
                  type="button"
                  className={
                    activeDays === 90
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => handleBtnClick(90)}
                >
                  90 {window.strings.Dashboard_days || "Days"}
                </button>
                <button
                  type="button"
                  className={
                    activeDays === 0
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => handleBtnClick(0)}
                >
                  {window.strings.Dashboard_allTime || "All Time"}
                </button>
              </div>
            </Col>
          </Row>
          {error && (
            <div className="text-center">
              <p>
                {window.strings.Dashboard_errorOccured || "Some Error occured"}
              </p>
            </div>
          )}
          {loading && (
            <div className="text-center">
              <Spinner style={{ width: "3rem", height: "3rem" }} />
            </div>
          )}

          {response && (
            <Row>
              <Col xs="3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_callsMade || "Calls Made"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.calls_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-phone fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_userAdded || "Users Added"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.users_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-user fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_countries || "Countries"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.countries_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-globe fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_smsSent || "SMS Sent"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.sms_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-commenting-o fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3" className="mt-3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_emailSent || "Emails Sent"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.email_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-envelope-o fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3" className="mt-3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_successLogin ||
                            "Successful Logins"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.successful_login_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-sign-in fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3" className="mt-3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_failedLogin ||
                            "Failed Login"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.failed_login_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-exclamation-triangle fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3" className="mt-3">
                <div className="card border-left-primary  h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          {window.strings.Dashboard_inactiveUsers ||
                            "Inactive users"}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {response.inactive_users_count}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-arrow-down fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}
