import React from "react";

import { Jumbotron } from "reactstrap";

export default function BulkUserContent(props) {
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
        <b>Note - * Fields are mandatory | Position is optional</b>
      </p>
    </Jumbotron>
  );
}
