import React, { useState } from 'react';
import './add__single_user.css';
import validate from '../utils/validateRules';
import useForm from '../utils/useForm';
import AlertShow from '../utils/useAlert';

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Spinner,
} from 'reactstrap';
import Select from 'react-select';

import countryJson from '../../../utils/CountryOptions';

export default function AddSingleUsers({ handleSingleUserAPI }) {
  const [passwordType, setPasswordType] = useState(true);
  const [responseMsg, setResponseMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleClear,
    handleReset,
    handleCountryChange,
  } = useForm(handleSuccess, validate, passwordType);

  function handleSuccess() {
    setLoading(true);
    if (passwordType) {
      values.pass_gen = 'provide_password';
    } else {
      values.pass_gen = 'generate_password';
    }
    try {
      values.userCountry = values.userCountryCode.value;
    } catch (e) {
      console.log(e);
    }
    let submitData = Object.assign({}, values);
    delete submitData.userCountryCode;
    handleSingleUserAPI(submitData, handleResponseCallBack);
  }

  let handleResponseCallBack = (res) => {
    if (!res.errors) {
      setResponseMsg([
        {
          title: window.string.Dashboard_userCreated || 'User created successfully',
          success: true,
        },
      ]);

      handleReset();
    } else {
      setLoading(false);

      const { errors } = res;

      let responseMessage = [];

      Object.keys(errors).map((key) => {
        const errorMessageTranslation =
          window.strings[errors[key][0]] || errors[key][0];

        responseMessage.push({
          title: `${errorMessageTranslation}`,
          success: false,
        });
      });

      setResponseMsg(responseMessage);
      return;
    }

    setLoading(false);
  };

  const handleRadio = () => {
    setPasswordType(!passwordType);
  };

  const dismissAlert = (key) => {
    const messages = [...responseMsg];

    if (key > -1) {
      messages.splice(key, 1);
    }

    setResponseMsg(messages);
  };

  const handleInputClear = () => {
    setResponseMsg([]);
    handleClear();
  };

  const showAlerts = () => {
    if (responseMsg.length === 0) {
      return;
    }

    return responseMsg.map((message, key) => (
      <AlertShow
        key={key}
        color={message.success ? 'primary' : 'danger'}
        msg={message.title}
        dismissCall={() => dismissAlert(key)}
      />
    ));
  };

  return (
    <div className="pt-3 pl-4 pr-4">
      <Form onSubmit={handleSubmit} noValidate>
        {showAlerts()}
        {loading && (
          <div className="text-center">
            <Spinner style={{ width: '3rem', height: '3rem' }} />
          </div>
        )}

        <FormGroup>
          <Label htmlFor="nf-name">
            {window.strings.Dashboard_name || 'Name'}
          </Label>
          <Input
            type="text"
            id="nf-name"
            name="name"
            placeholder={window.strings.Dashboard_enterName || "Enter Name"}
            value={values.name || ''}
            onChange={handleChange}
            className={errors.name ? 'is-invalid' : ''}
          />
          {errors.name && (
            <small className="form-text text-danger">{errors.name}</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nf-email">
            {window.strings.Dashboard_email || 'Email'}
          </Label>
          <Input
            type="email"
            id="nf-email"
            name="email"
            placeholder={window.strings.Dashboard_enterEmail || "Enter Email"}
            autoComplete="email"
            value={values.email || ''}
            onChange={handleChange}
            className={errors.email ? 'is-invalid' : ''}
          />
          {errors.email && (
            <small className="form-text text-danger">{errors.email}</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nf-password">
            {window.strings.Dashboard_password || 'Password'}
          </Label>
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
                {window.strings.Dashboard_enterPassword || ' Enter Password'}
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
                {window.strings.Dashboard_sendPassword ||
                  "Send Password Generation link to User's Email"}
              </Label>
            </FormGroup>
          </div>
          <Input
            type="password"
            name="password"
            placeholder={window.strings.Dashboard_enterPassword || ' Enter Password'}
            disabled={!passwordType}
            value={values.password || ''}
            className={errors.password ? 'is-invalid' : ''}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="form-text text-danger">{errors.password}</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nf-position">
            {window.strings.Dasboard_position || 'Position'}
          </Label>
          <Input
            type="text"
            id="nf-position"
            name="position"
            placeholder={window.strings.Dasboard_position || 'Position'}
            onChange={handleChange}
            value={values.position || ''}
          />
        </FormGroup>
        <FormGroup>
          <Label>{window.strings.Dashboard_country || 'Country'}</Label>
          <Select
            name="userCountryCode"
            placeholder={`${window.strings.selectText}...`}
            options={countryJson}
            onChange={handleCountryChange}
            isClearable={true}
            defaultValue={values.userCountryCode || null}
            value={values.userCountryCode || null}
          />
          {errors.country && (
            <small className="form-text text-danger">{errors.country}</small>
          )}
        </FormGroup>
        <FormGroup className="mt-4">
          <Row>
            <Col>
              <Button color="primary" block>
                {window.strings.Dashboard_submit || 'Submit'}
              </Button>
            </Col>
            <Col>
              <Button color="info" block onClick={handleInputClear}>
                {window.strings.Dashboard_clear || 'Clear'}
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
}
