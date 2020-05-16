import React, { useState, useEffect } from "react";
import { Button, Input, Spinner } from "reactstrap";
import Select from "react-select";

import countryOptions from "../utils/CountryOptions";
import positionOptions from "../logsCallactivity_Utils/PositionList";
import {
  createCommaSeperatedValues,
  formatDate,
  convertToHMS
} from "../logsCallactivity_Utils/createCommaSeperatedValues";
import DatePicker from "../logsCallactivity_Utils/DatePicker";
import PagesButton from "../logsCallactivity_Utils/PagesButton";

import "./call__activity.css";

const CallActivity = props => {
  const { getAPI, filteringAPI } = props;

  const [shouldShowFilterOptions, setShowFilterOptions] = useState(false);

  const [callActivityData, setCallActivityData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState("");
  const [paginate, setPaginate] = useState(25);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filter = () => {
    setLoading(true);
    (async () => {
      const res = await filteringAPI(
        name,
        email,
        date,
        paginate,
        createCommaSeperatedValues(country),
        createCommaSeperatedValues(position)
      );
      setCallActivityData(res);
      setLoading(false);
    })();
  };

  const reset = () => {
    setLoading(true);
    setName("");
    setEmail("");
    setCountry("");
    setPosition("");
    setDate("");
    setPaginate(25);
    setStartDate(null);
    setEndDate(null);
    (async () => {
      const response = await getAPI();
      setCallActivityData(response);
      setLoading(false);
    })();
  };

  const toggleFilterOptions = () =>
    setShowFilterOptions(!shouldShowFilterOptions);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleCountryChange = option => {
    setCountry(option);
  };

  const handlePositionChange = option => {
    setPosition(option);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);

    let date1 = formatDate(new Date(startDate._d).toDateString());
    if (endDate) {
      date1 += " to ";
      date1 += formatDate(new Date(endDate._d).toDateString());
    }
    setDate(date1);
  };

  const handlePagination = e => {
    setPaginate(e.target.value);
    setLoading(true);
    (async () => {
      const response = await filteringAPI(
        name,
        email,
        date,
        e.target.value,
        createCommaSeperatedValues(country),
        createCommaSeperatedValues(position)
      );
      setCallActivityData(response);
      setLoading(false);
    })();
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getAPI();
      setCallActivityData(res);
      setLoading(false);
    })();
  }, []);

  function TableContent() {
    let tableContent = null;
    if (callActivityData !== null) {
      tableContent = callActivityData.data.map((content, index) => {
        const callStartTime = new Date(content.call_start_time);
        return (
          <tr key={content.id} className="text-left">
            <td>
              <div>
                {callActivityData.current_page * paginate -
                  paginate +
                  index +
                  1}
              </div>
            </td>
            <td>
              <div>{content.user_name}</div>
              <div className="small text-muted">Position: IT</div>
            </td>
            <td>{content.users_email}</td>
            <td>India</td>
            <td>{content.room_id}</td>
            <td>{content.to_phonenumber ? content.to_phonenumber : "NA"}</td>
            <td>
              {callStartTime.toLocaleDateString("en-GB", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </td>
            <td>
              {content.call_end_time
                ? convertToHMS(
                    (new Date(content.call_end_time).getTime() -
                      new Date(content.call_start_time).getTime()) /
                      1000
                  )
                : "_"}
            </td>
          </tr>
        );
      });
    }
    return tableContent;
  }

  let filterOptions = null;
  if (shouldShowFilterOptions) {
    filterOptions = (
      <div className="container ml-0 border p-3 mt-3 mw-100 rounded">
        <div className="row">
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">Name</h6>
            <Input
              type="text"
              placeholder="Name"
              className="d-block"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">Email</h6>
            <Input
              type="text"
              placeholder="Email"
              className="d-block"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="col-lg-3 mb-2">
            <h6 className="ml-4 d-flex font-weight-bold text-muted">
              Created On
            </h6>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              handleDatesChange={handleDateChange}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">Country</h6>
            <Select
              placeholder="Country"
              className="d-block text-left"
              value={country}
              isMulti
              options={countryOptions}
              onChange={handleCountryChange}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">Position</h6>
            <Select
              placeholder="Position"
              className="d-block text-left"
              value={position}
              isMulti
              options={positionOptions}
              onChange={handlePositionChange}
            />
          </div>
        </div>
        <div className="row ml-2">
          <Button
            color="primary"
            className="d-flex ml-2"
            size="sm"
            onClick={filter}
          >
            Filter
          </Button>
          <Button
            color="secondary"
            className="d-flex ml-3"
            size="sm"
            onClick={reset}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" p-3 mt-3 bg-white border">
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="mr-2"
            onClick={toggleFilterOptions}
          >
            {shouldShowFilterOptions ? "Hide" : "Show"} Filter Options
          </Button>
          <Input type="select" onChange={handlePagination} className="w-25">
            <option value="10">Show 10</option>
            <option value="25" selected>
              Show 25
            </option>
            <option value="50">Show 50</option>
            <option value="100">Show 100</option>
            <option value="200">Show 200</option>
          </Input>
        </div>

        {filterOptions}

        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : callActivityData ? (
          callActivityData.data.length !== 0 ? (
            <div className="table-responsive mt-3 mb-3  ">
              <table className="table-outline mb-0 d-none d-sm-table table table-hover overflow-auto">
                <thead className="thead-light text-left">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Room Id</th>
                    <th>To Phone Number</th>
                    <th>Call Start Time</th>
                    <th>Call Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent />
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5">No Result Found</div>
          )
        ) : null}

        <div className="d-flex justify-content-between">
          <p className="text-left text-muted total_call_font">
            Total calls : {callActivityData ? callActivityData.total : ""}
          </p>
          <PagesButton
            data={callActivityData}
            setData={setCallActivityData}
            getAPI={getAPI}
            setLoading={setLoading}
            parameters={`name=${name}&email=${email}&created_at=${date}&paginate=${paginate}&country=${createCommaSeperatedValues(
              country
            )}&position=${createCommaSeperatedValues(position)}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CallActivity;
