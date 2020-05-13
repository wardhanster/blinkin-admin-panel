import React, { useState } from "react";

import { Alert } from "reactstrap";

export default function AlertShow({ msg, color, dismissCall, visible }) {
  const [show, setShow] = useState(msg ? true : false);

  const onDismiss = () => {
    setShow(false);
    dismissCall();
  };

  return (
    <Alert color={color} isOpen={show} toggle={onDismiss} className="mt-3">
      {msg}
    </Alert>
  );
}
