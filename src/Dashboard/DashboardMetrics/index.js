import React, { useState, useEffect } from "react";
import "./dashboard-metrics.css";
import countryOptions from "../../utils/CountryOptions";
import DropDownSelect from "../../utils/DropDownSelect";
import DateRange from "./DateRange";

export default function DashboardMetrics({ responseData, updateFilter }) {
  const [query, setQuery] = useState();
  const [costSavings, setCostSavings] = useState(0);
  const [carbonEmission, setCarbonEmission] = useState(0);

  function dateFormat(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleCountry = (data, type) => {
    var countryType = {
      [type]: data["value"],
    };
    setQuery({ ...query, ...countryType });
  };

  useEffect(() => {
    if (query) {
      updateFilter(query);
    }
  }, [query]);

  const handleAvgCost = (e) => {
    if (!isNaN(e.target.value)) {
      let cost = parseFloat(responseData.scr_data.yes * e.target.value).toFixed(
        2
      );
      setCostSavings(cost);
    }
  };

  const onChange = (date, type) => {
    if (date && type) {
      var data = {
        [type]: `${dateFormat(date[0])} to ${dateFormat(date[1])}`,
      };
      setQuery({ ...query, ...data });
    } else if (!date) {
      try {
        let Cquery = { ...query };
        delete Cquery[type];
        setQuery(Cquery);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const carbonCalculation = (e) => {
    if (!isNaN(e.target.value)) {
      let cal = (0.2 * e.target.value).toFixed(2);
      setCarbonEmission(cal);
    }
  };

  return (
    <div className="dashboatd-metrics">
      <div className="card">
        <div className="card-body dashboard_cardbody">
          <div className="row mb-3">
            <div className="col-3">
              <h6>
                <b>Feedback</b>
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <p>
                    "Could the problem of the customer be solved with the help
                    of the Wilo-Live Assistant?"
                  </p>
                  <p>
                    Answered by: <b>Agent</b>
                  </p>
                  <hr />
                  <div className="row mb-1">
                    <div className="col-6 p-2">
                      <DateRange onChange={onChange} type="q1DateRange" />
                    </div>
                    <div className="col-6">
                      <DropDownSelect
                        onSelect={handleCountry}
                        option={countryOptions}
                        multi={false}
                        blur={true}
                        clear={true}
                        type="q1UserCountry"
                      />
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card q1-approval mb-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-6 text-center">
                                <p className="avg-approval">Average Approval</p>
                              </div>
                              <div className="col-6 text-center">
                                <p className="percentage-q1">
                                  {responseData.psr_data["approval"]}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card q1-approval-total">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">Total Response</p>
                              </div>
                              <div className="col-12 total-count">
                                {responseData.psr_data["total"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card q1-approval-yes">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">
                                  Response <br />
                                  Yes
                                </p>
                              </div>
                              <div className="col-12 total-count">
                                {responseData.psr_data["yes"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card q1-approval-no">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">
                                  Response <br />
                                  No
                                </p>
                              </div>
                              <div className="col-12 total-count">
                                {" "}
                                {responseData.psr_data["no"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <p>
                    "Did we avoid a warranty case with the help of the Wilo-Live
                    Assistant?"
                  </p>
                  <p>
                    Answered by: <b>Agent</b>
                  </p>
                  <hr />
                  <div className="row mb-1">
                    <div className="col-6 p-2">
                      <DateRange onChange={onChange} type="q2DateRange" />
                    </div>
                    <div className="col-6">
                      <DropDownSelect
                        onSelect={handleCountry}
                        option={countryOptions}
                        multi={false}
                        blur={true}
                        type="q2UserCountry"
                      />
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card q1-approval mb-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-6 text-center">
                                <p className="avg-approval">Average Approval</p>
                              </div>
                              <div className="col-6 text-center">
                                <p className="percentage-q1">
                                  {responseData.scr_data["approval"]}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card q1-approval-total">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">Total Response</p>
                              </div>
                              <div className="col-12 total-count">
                                {responseData.scr_data["total"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card q1-approval-yes">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">
                                  Response <br />
                                  Yes
                                </p>
                              </div>
                              <div className="col-12 total-count">
                                {responseData.scr_data["yes"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card q1-approval-no">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">
                                  Response <br />
                                  No
                                </p>
                              </div>
                              <div className="col-12 total-count">
                                {responseData.scr_data["no"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="card">
                <div className="card-body">
                  <p>
                    How do you rate the benefits of the Wilo-Live Assistant ?
                  </p>
                  <p>
                    Answered by: <b>Agent</b>
                  </p>
                  <hr />
                  <div className="row mb-1">
                    <div className="col-6 p-2">
                      <DateRange onChange={onChange} type="q3DateRange" />
                    </div>
                    <div className="col-6">
                      <DropDownSelect
                        onSelect={handleCountry}
                        option={countryOptions}
                        multi={false}
                        blur={true}
                        type="q3UserCountry"
                      />
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card q1-approval mb-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-6 text-center">
                                <p className="avg-approval">Average Approval</p>
                              </div>
                              <div className="col-6 text-center">
                                <p className="percentage-q1">
                                  {responseData.cr_data["approval_rating"]}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="card q1-approval-total">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">Approval Score</p>
                              </div>
                              <div className="col-12 total-count">
                                {responseData.cr_data["approval_score"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="card q1-approval-yes">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">
                                  Total <br />
                                </p>
                              </div>
                              <div className="col-12 total-count">
                                {responseData.cr_data["total"]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-2">
                        <div className="card q1-approval-no">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <p className="total-txt">
                                  Ratings <br />
                                </p>
                              </div>
                              <div className="col-12 total-count">
                                <h6>
                                  Rating 5/5 :{" "}
                                  {responseData.cr_data["rating_5"]}
                                </h6>
                                <h6>
                                  Rating 4/5 :{" "}
                                  {responseData.cr_data["rating_4"]}
                                </h6>
                                <h6>
                                  Rating 3/5 :{" "}
                                  {responseData.cr_data["rating_3"]}
                                </h6>
                                <h6>
                                  Rating 2/5 :{" "}
                                  {responseData.cr_data["rating_2"]}
                                </h6>
                                <h6>
                                  Rating 1/5 :{" "}
                                  {responseData.cr_data["rating_1"]}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* impact board */}
      <div className="row mt-2">
        <div className="col-12 mb-3">
          <div className="page-title-box">
            <div className="card m-0">
              <div className="card-body">
                <h4>Impact Board</h4>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card widget-user">
                      <div className="card-body">
                        <div className="form-inline">
                          <div className="form-group mt-3 mr-3">
                            <label htmlFor="avCostPerDispatch" className="mr-2">
                              Average Costs per Dispatch: EUR
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="avCostPerDispatch"
                              placeholder="enter cost"
                              onChange={(e) => handleAvgCost(e)}
                            />
                          </div>
                        </div>
                        <hr />
                        <h4 id="costSavings">
                          Calculated Cost Savings:{" "}
                          <strong>€ {costSavings}</strong>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card widget-user">
                      <div className="card-body">
                        <div className="form-inline">
                          <div className="form-group mt-3 mr-3">
                            <label htmlFor="avTravel" className="">
                              Average Travel Distance per Dispatch:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="avTravel"
                              placeholder="enter distance"
                              onChange={(e) => carbonCalculation(e)}
                            />
                            <span className="small">KM</span>
                          </div>
                        </div>
                        <hr />
                        <p className="mb-0" id="carbonEmission">
                          Carbon Emissions Saved:{" "}
                          <strong>{carbonEmission} KG</strong>
                        </p>
                        <small>basis: vehicle emitting 200g/km</small>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mb-0" id="client_pp">
                  Client Promoter Potential: <strong>69.27</strong>
                </p>
                <small>(% of 4*+5* ratings minus % of 1*+2* ratings)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
