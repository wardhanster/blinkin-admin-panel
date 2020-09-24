import React, { useState, useRef } from "react";

import { Card, CardBody } from "reactstrap";

import DateRange from "../utils/DateRange";
import DropDownSelect from "../utils/DropDownSelect";

import countryOptions from "../utils/CountryOptions";

// const DateRange = React.lazy(() => import("../utils/DateRange"));
// const DropDownSelect = React.lazy(() => import("../utils/DropDownSelect"));

function Filter({ handleFilterSubmit, handleClear }) {
  const [userFilterData, setUserFilterData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [clear, setClear] = useState(false);
  const buttonMapRef = useRef(null);

  const handleInputChange = (e) => {
    setUserFilterData({
      ...userFilterData,
      [e.target.name]: e.target.value,
    });
    buttonMapRef.current = true;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let created_at;
    if (startDate) {
      created_at = startDate;
    }
    if (endDate) {
      created_at += " to " + endDate;
    }
    let data = { ...userFilterData };
    if (created_at) {
      data.created_at = created_at;
    }
    console.log(data);
    if (buttonMapRef.current) {
      handleFilterSubmit(data);
      buttonMapRef.current = false;
    }
  };

  const handleClearBtn = () => {
    setClear(true);
    setUserFilterData({});
    handleClear();
  };

  const handleCountry = (country) => {
    try {
      if (country.length > 0) {
        let countryStr = country.map((val) => val.value).toString();
        setUserFilterData({
          ...userFilterData,
          country: countryStr,
        });
        buttonMapRef.current = true;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDate = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    }
    buttonMapRef.current = true;
  };

  return (
    <div>
      <Card className="mb-2">
        <CardBody>
          <form onSubmit={handleSearch}>
            <div className="container-fluid search_container">
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="ccyear">
                    <small>
                      {window.strings.Dashboard_country || "Country"}
                    </small>
                  </label>
                  <DropDownSelect
                    clear={clear}
                    onSelect={handleCountry}
                    option={countryOptions}
                  />
                </div>
                <div className="form-group col-sm-2">
                  <label htmlFor="ccmonth">
                    <small>{window.strings.Dashboard_name || "Name"}</small>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-sm"
                    value={userFilterData.name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-sm-2">
                  <label htmlFor="ccyear">
                    <small>{window.strings.Dashboard_email || "Email"}</small>
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control form-control-sm"
                    value={userFilterData.email || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="cvv">
                      <small>
                        {window.strings.Dashboard_cretedOn ||
                          "Created On (End date Optional)"}
                      </small>
                    </label>
                    {/* <input
                    className="form-control form-control-sm"
                    name="date"
                    type="date"
                    placeholder="Date"
                    value={userFilterData.date || ""}
                    onChange={handleInputChange}
                  /> */}
                    <DateRange clear={clear} handleDate={handleDate} />
                  </div>
                </div>

                <div className="col-sm-2 mbtn">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSearch}
                  >
                    {window.strings.Dashboard_search || "Search"}
                  </button>{" "}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={handleClearBtn}
                  >
                    {window.strings.Dashboard_clear || "Clear"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default React.memo(Filter);
