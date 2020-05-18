import React, { useState } from "react";

import { Jumbotron } from "reactstrap";

import CountryISOModal from "../utils/CountryISOModal";

export default function BulkUserContent(props) {
  const [active, setActive] = useState(false);

  const toggleModal = status => {
    setActive(status);
  };

  const activeModal = () => {
    setActive(true);
  };

  let { content } = props;
  return (
    <Jumbotron>
      <p>
        If the email already exists, this will not create the user for that row.
      </p>
      <p>
        The file should contain the following columns, without any heading row
      </p>
      <b>
        name *, email *,{content === "provide_password" ? " password *," : ""}{" "}
        country ISO code *, position
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
          Country ISO code Reference
        </button>
      </p>
      <p>
        <b>Note - * Fields are mandatory | Position is optional</b>
      </p>
      <CountryISOModal active={active} modalStatus={toggleModal} />
    </Jumbotron>
  );
}
