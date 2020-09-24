import React, { useState } from "react";

import { Jumbotron } from "reactstrap";

import CountryISOModal from "../utils/CountryISOModal";

export default function BulkUserContent(props) {
  const [active, setActive] = useState(false);

  const toggleModal = (status) => {
    setActive(status);
  };

  const activeModal = () => {
    setActive(true);
  };

  let { content } = props;
  return (
    <Jumbotron>
      <p>
        {window.strings.Dashboard_emailAlready ||
          " If the email already exists, this will not create the user for that row."}
      </p>
      <p>
        {window.strings.Dashboard_theFileshould ||
          " The file should contain the following columns, without any heading row"}
      </p>
      <b>
        name *, email *,{content === "provide_password" ? " password *," : ""}{" "}
        {window.strings.Dashboard_countryIsoCode || "country ISO code"} *,{" "}
        {window.strings.Dashboard_position || "position"}
      </b>
      <p>
        <kbd>
          John Doe, j.doe@example.com,
          {content === "provide_password" ? " myPassword," : ""} DE, Agent
        </kbd>
      </p>
      <p>
        <kbd>
          Jane Doe, jane@testing.com,{" "}
          {content === "provide_password" ? " secretPassword," : ""} CN
        </kbd>
      </p>
      <p>
        <button className="btn btn-link" onClick={activeModal}>
          {window.strings.Dashboard_countryIOScodeReference ||
            "Country ISO code Reference"}
        </button>
      </p>
      <p>
        <b>
          {window.strings.Dashboard_noteMsg ||
            "Note - * Fields are mandatory | Position is optional"}
        </b>
      </p>
      <CountryISOModal active={active} modalStatus={toggleModal} />
    </Jumbotron>
  );
}
