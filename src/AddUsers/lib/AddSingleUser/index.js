import React, { useState } from "react";

import "./add__single_user.css";
import validate from "../utils/validateRules";
import useForm from "../utils/useForm";
import AlertShow from "../utils/useAlert";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Spinner
} from "reactstrap";
import Select from "react-select";

import countryJson from "../../../utils/CountryOptions";

export default function AddSingleUsers({ handleSingleUserAPI }) {
  const [passwordType, setPasswordType] = useState(true);
  const [responseMsg, setResponseMsg] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleClear,
    handleReset,
    handleCountryChange
  } = useForm(handleSuccess, validate, passwordType);

  function handleSuccess() {
    setLoading(true);
    if (passwordType) {
      values.pass_gen = "provide_password";
    } else {
      values.pass_gen = "generate_password";
    }
    try {
      values.userCountry = values.userCountry.value;
    } catch (e) {
      console.log(e);
    }
    handleSingleUserAPI(values, handleResponseCallBack);
  }

  let handleResponseCallBack = res => {
    if (res[0].success) {
      setResponseMsg(res[0].message);
      setShowAlert(true);
      setSuccess(true);
      handleReset();
    } else {
      setResponseMsg(res[0].message);
      setShowAlert(true);
      setSuccess(false);
    }

    setLoading(false);
  };

  const handleRadio = () => {
    setPasswordType(!passwordType);
  };

  const dismissAlert = () => {
    setResponseMsg(null);
  };

  const handleInputClear = () => {
    setResponseMsg(null);
    setShowAlert(false);
    handleClear();
  };

  return (
    <div className="pt-3 pl-4 pr-4">
      <Form onSubmit={handleSubmit} noValidate>
        {responseMsg && (
          <AlertShow
            color={success ? "primary" : "danger"}
            msg={responseMsg}
            visible={showAlert}
            dismissCall={dismissAlert}
          />
        )}
        {loading && (
          <div className="text-center">
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        )}

        <FormGroup>
          <Label htmlFor="nf-name">Name</Label>
          <Input
            type="text"
            id="nf-name"
            name="name"
            placeholder="Enter Name"
            value={values.name || ""}
            onChange={handleChange}
            className={errors.name ? "is-invalid" : ""}
          />
          {errors.name && (
            <small className="form-text text-danger">{errors.name}</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nf-email">Email</Label>
          <Input
            type="email"
            id="nf-email"
            name="email"
            placeholder="Enter Email"
            autoComplete="email"
            value={values.email || ""}
            onChange={handleChange}
            className={errors.email ? "is-invalid" : ""}
          />
          {errors.email && (
            <small className="form-text text-danger">{errors.email}</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nf-password">Password</Label>
          <div className="pb-2">
            <FormGroup check inline>
              <Input
                className="form-check-input"
                type="radio"
                id="inline-radio1"
                name="inline-radios"
                value="enter_password"
                checked={passwordType}
                onChange={handleRadio}
              />
              <Label className="form-check-label" check htmlFor="inline-radio1">
                Enter Password
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                className="form-check-input"
                type="radio"
                id="inline-radio2"
                name="inline-radios"
                value="generation_link"
                checked={!passwordType}
                onChange={handleRadio}
              />
              <Label className="form-check-label" check htmlFor="inline-radio2">
                Send Password Generation link to User's Email
              </Label>
            </FormGroup>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            disabled={!passwordType}
            value={values.password || ""}
            className={errors.password ? "is-invalid" : ""}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="form-text text-danger">{errors.password}</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nf-position">Position</Label>
          <Input
            type="text"
            id="nf-position"
            name="position"
            placeholder="Enter Position"
            onChange={handleChange}
            value={values.position || ""}
          />
        </FormGroup>
        <FormGroup>
          <Label>Country</Label>
          <Select
            name="userCountry"
            options={countryJson}
            onChange={handleCountryChange}
            isClearable={true}
            value={values.userCountry || null}
          />
          {errors.country && (
            <small className="form-text text-danger">{errors.country}</small>
          )}
        </FormGroup>
        <FormGroup className="mt-4">
          <Row>
            <Col>
              <Button color="primary" block>
                Submit
              </Button>
            </Col>
            <Col>
              <Button color="info" block onClick={handleInputClear}>
                Clear
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
}
