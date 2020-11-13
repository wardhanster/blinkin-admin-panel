import React, { useState, useEffect } from "react";
import { Button, Input, Spinner } from "reactstrap";
import Select from "react-select";

import positionOptions from "../logsCallactivity_Utils/PositionList";
import countryOptions from "../utils/CountryOptions";
import {
  createCommaSeperatedValues,
  formatDate,
} from "../logsCallactivity_Utils/createCommaSeperatedValues";
import DatePicker from "../logsCallactivity_Utils/DatePicker";
import PagesButton from "../logsCallactivity_Utils/PagesButton";
import "./log.css";

const logTypeOptions = [
  {
    value: "Link sent by SMS",
    label: window.strings.Dashboard_linkSentMsg || "Link Sent By SMS",
  },
  {
    value: "Successful login",
    label: window.strings.Dashboard_successfulLogin || "Successful Login",
  },
  {
    value: "Failed Login",
    label: window.strings.Dashboard_failedLogin || "Failed Login",
  },
  {
    value: "Link sent by email",
    label: window.strings.Dashboard_linkSentEmail || "Link Sent By Email",
  },
  {
    value: "Beam link sent by SMS",
    label: window.strings.Dashboard_beamLinkSentMsg || "Beam Link Sent By SMS",
  },
  {
    value: "Beam link sent by email",
    label:
      window.strings.Dashboard_beamLinkSentEmail || "Beam Link Sent By Email",
  },
];

const Logs = (props) => {
  const { getAPI, filteringAPI, getTimeZone } = props;

  const [logsData, setLogsData] = useState(null);
  const [shouldShowFilterOptions, setShowFilterOptions] = useState(false);

  const [logType, setLogType] = useState([]);
  const [country, setCountry] = useState([]);
  const [position, setPosition] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ip, setIP] = useState("");
  const [paginate, setPaginate] = useState(25);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAPI();
      setLogsData(res);
      setLoading(false);
    })();
  }, []);

  const handleLogTypeChange = (option) => {
    setLogType(option);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIPChange = (e) => {
    setIP(e.target.value);
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

  const handleCountryChange = (option) => {
    setCountry(option);
  };

  const handlePositionChange = (option) => {
    setPosition(option);
  };

  const filter = () => {
    setLoading(true);
    (async () => {
      const res = await filteringAPI(
        createCommaSeperatedValues(logType),
        name,
        email,
        ip,
        paginate,
        date,
        createCommaSeperatedValues(country),
        createCommaSeperatedValues(position)
      );

      setLogsData(res);
      setLoading(false);
    })();
  };

  const reset = () => {
    setLoading(true);
    setName("");
    setEmail("");
    setCountry("");
    setPosition("");
    setIP("");
    setLogType("");
    setDate("");
    setPaginate(25);
    setEndDate(null);
    setStartDate(null);
    (async () => {
      const response = await getAPI();
      setLogsData(response);
      setLoading(false);
    })();
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!shouldShowFilterOptions);
  };

  const handlePagination = (e) => {
    setPaginate(e.target.value);
    setLoading(true);
    (async () => {
      const response = await filteringAPI(
        createCommaSeperatedValues(logType),
        name,
        email,
        ip,
        e.target.value,
        date,
        createCommaSeperatedValues(country),
        createCommaSeperatedValues(position)
      );
      setLogsData(response);
      setLoading(false);
    })();
  };

  let tableContent = null;
  if (logsData !== null) {
    tableContent = logsData.data.map((content, index) => {
      // const created_at = new Date(content.created_at);

      return (
        <tr key={`logs_${index}`} className="text-left">
          <td>
            <div>{content.user_name}</div>
            <div className="small text-muted">
              {window.strings.Dashboard_registered || "Registered"}:{" "}
              {getTimeZone(content.created_at, "DD MMM YYYY, h:mm A")}
            </div>
          </td>
          <td>{content.users_email}</td>
          <td>
            {content.country ? (
              <i
                title={content.country}
                className={`flag-icon flag-icon-${content.country.toLocaleLowerCase()} h4 mb-0`}
              ></i>
            ) : (
              "India"
            )}
          </td>
          <td>{content.position ? content.position : "NA"}</td>
          <td>{content.ip ? content.ip : "_"}</td>
          <td>{content.event_type}</td>
        </tr>
      );
    });
  }

  let filterOptions = null;
  if (shouldShowFilterOptions) {
    filterOptions = (
      <div className="container ml-0 border p-3 mt-3 mw-100 rounded">
        <div className="row">
          <div className="ml-3 small col-lg-5 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.Dashboard_logType || "Log Type"}
            </h6>
            <Select
              placeholder="Log Type"
              className="d-block text-left"
              value={logType}
              isMulti
              options={logTypeOptions}
              onChange={handleLogTypeChange}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.Dashboard_name || "Name"}
            </h6>
            <Input
              type="text"
              placeholder="Name"
              className="d-block"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.Dashboard_email || "Email"}
            </h6>
            <Input
              type="text"
              placeholder="Email"
              className="d-block"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="ml-3 small col-lg-2 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.Dashboard_ip || "IP"}
            </h6>
            <Input
              type="text"
              className="d-block"
              value={ip}
              onChange={handleIPChange}
            />
          </div>
          <div className="d-flex flex-column align-items-start col-lg-3  mb-2">
            <h6 className="font-weight-bold text-muted">
              {window.strings.Dashboard_createdOn || "Created On"}
            </h6>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              handleDatesChange={handleDateChange}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.Dashboard_country || "Country"}
            </h6>
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
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.Dashboard_position || "Position"}
            </h6>
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
            {window.strings.Dashboard_filter || "Filter"}
          </Button>
          <Button
            color="secondary"
            className="d-flex ml-3"
            size="sm"
            onClick={reset}
          >
            {window.strings.Dashboard_reset || "Reset"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-3 mt-3 bg-white border">
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="d-flex"
            onClick={toggleFilterOptions}
          >
            {shouldShowFilterOptions ? "Hide" : "Show"}{" "}
            {window.strings.Dashboard_filterOptions || "Filter Options"}
          </Button>
          <Input
            type="select"
            onChange={handlePagination}
            className="w-25 mr-3"
            defaultValue="25"
          >
            <option value="10">Show 10</option>
            <option value="25">Show 25</option>
            <option value="50">Show 50</option>
            <option value="100">Show 100</option>
            <option value="200">Show 200</option>
          </Input>
        </div>

        {filterOptions}
        {loading ? (
          <div className="text-center">
            <Spinner color="secondary" className="m-4" />
          </div>
        ) : logsData ? (
          logsData.data.length !== 0 ? (
            <div className="table-responsive mt-3 mb-3  ">
              <table className="table-outline mb-0 d-none d-sm-table table table-hover overflow-auto">
                <thead className="thead-light text-left">
                  <tr>
                    <th>{window.strings.Dashboard_user || "User"}</th>
                    <th>{window.strings.Dashboard_email || "Email"}</th>
                    <th>{window.strings.Dashboard_country || "Country"}</th>
                    <th>{window.strings.Dashboard_position || "Position"}</th>
                    <th>
                      {window.strings.Dashboard_ipAddress || "IP Address"}
                    </th>
                    <th>
                      {window.strings.Dashboard_eventType || "Event Type"}
                    </th>
                  </tr>
                </thead>
                <tbody>{tableContent}</tbody>
              </table>
            </div>
          ) : (
            <div className="p-5">
              {window.strings.Dashboard_noResultFound || "No Result Found"}
            </div>
          )
        ) : null}
        <div className="d-flex justify-content-between">
          <p className="text-left text-muted total_call_font">
            {window.strings.Dashboard_totalLogs || "Total Logs"} :{" "}
            {logsData ? logsData.total : ""}
          </p>
          <PagesButton
            data={logsData}
            setData={setLogsData}
            getAPI={getAPI}
            loading={loading}
            setLoading={setLoading}
            parameters={`event_type=${createCommaSeperatedValues(
              logType
            )}&name=${name}&email=${email}&paginate=${paginate}&ip=${ip}&created_at=${date}&position=${createCommaSeperatedValues(
              position
            )}&country=${createCommaSeperatedValues(country)}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Logs;
