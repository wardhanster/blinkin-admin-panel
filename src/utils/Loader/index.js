import React from "react";
import { Spinner } from "reactstrap";
export default function Loader() {
  return (
    <div className="text-center mt-4">
      <Spinner style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
}
