import React, { useState } from "react";

import "./add__bulk__users.css";

import { Form, Row, Col, Progress } from "reactstrap";

import BulkUserContent from "./BulkUserContent";
import FileUpload from "./FileUpload";

export default function AddBulkUsers({ handleBulkUploadFile }) {
  const [val, setVal] = useState("generate_password");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [msg, setMsg] = useState(null);
  let handleRadioBtn = newVal => {
    setVal(newVal);
  };

  const handleFileUploadResponse = res => {
    setMsg(res.data[0]["message"]);
  };

  const uploadProgress = uploadPercentage => {
    console.log("upload progress", uploadPercentage);
    setProgressPercentage(uploadPercentage);
  };

  let uploadFiles = file => {
    let data = {
      pass_gen: val,
      file
    };
    console.log(data);
    handleBulkUploadFile(data, uploadProgress, handleFileUploadResponse);
  };

  let clearAll = () => {
    setProgressPercentage(0);
    setMsg(null);
  };

  return (
    <div className="pt-3 pl-4 pr-4 add_bulk_users_container">
      <Form>
        <fieldset className="border p-2">
          <legend className="w-auto">Password Generation</legend>
          <Row className="pl-2 pr-2 pb-2">
            <Col>
              <div className="inputGroup">
                <input
                  id="radio1"
                  name="radio"
                  type="radio"
                  value="generate"
                  checked={val === "generate_password"}
                  onChange={() => handleRadioBtn("generate_password")}
                />
                <label htmlFor="radio1">
                  <b>Generate Password For me</b>
                </label>
              </div>
            </Col>
            <Col>
              <div className="inputGroup">
                <input
                  id="radio2"
                  name="radio"
                  type="radio"
                  value="provide"
                  checked={val === "provide_password"}
                  onChange={() => handleRadioBtn("provide_password")}
                />
                <label htmlFor="radio2">
                  <b>I Will Provide My Own Password in CSV</b>
                </label>
              </div>
            </Col>
          </Row>
        </fieldset>
      </Form>
      <BulkUserContent content={val} />
      {progressPercentage > 0 && (
        <Progress color="primary" value={progressPercentage} />
      )}
      {msg && (
        <div className="text-center mt-3">
          <p className="text-success">{msg}</p>
        </div>
      )}
      <FileUpload uploadFiles={uploadFiles} clearAll={clearAll} />
    </div>
  );
}
