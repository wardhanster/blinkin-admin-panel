import React, { useState, useEffect, Suspense } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Label,
  Input,
  FormGroup,
} from 'reactstrap';
import Loader from '../utils/Loader';
import { showMonthDateYear } from '../utils/DateHandle';

import countryOptions from '../utils/CountryOptions';
const DropDownSelect = React.lazy(() => import('../utils/DropDownSelect'));

const userInitialData = {
  name: '',
  email: '',
  position: '',
  country: '',
};

const MIN_PASSWORD_LENGTH = 7;

export default function UserModal({
  active,
  toggleModal,
  userDetails,
  modalLoading,
  updateUserDetails,
  updateErrors,
}) {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState(userInitialData);
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState({});
  const [respError, setRespError] = useState({});

  useEffect(() => {
    setUserData(userDetails);
    setRespError(updateErrors);
    console.log(userDetails);
  }, [userDetails, updateErrors]);

  const toggle = () => {
    setUserData(userInitialData);
    toggleModal(!modal);
    setModal((modal) => !modal);
  };

  useEffect(() => {
    setModal(active);
  }, [active]);

  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateForm = () => {
    let errors = {};
    if (!userData.name) {
      errors.user = 'Required';
    } else if (userData.name.length < 3) {
      errors.user = 'Minimum 3 Character';
    }

    if (!userData.country) {
      errors.country = 'Required';
    } else if (userData.country.length < 2) {
      errors.country = 'Enter Proper ISO code';
    }

    if (password) {
      if (password.length !== 0 && password.length <= MIN_PASSWORD_LENGTH) {
        errors.password = 'Password should be greater then 7 Character';
      }
    }

    setUserError(errors);

    if (Object.keys(errors).length === 0) {
      let newUpdatedUser = {
        name: userData.name,
        userCountry: userData.country,
        position: userData.position || '',
        password: password,
      };

      updateUserDetails(userData.id, newUpdatedUser);
    }
  };

  const handleCountrySelect = (val) => {
    setUserData({ ...userData, country: val.value });
  };

  const setDefaultOptions = (defaultVal) => {
    return countryOptions.find((element) => element.value === defaultVal);
  };

  // write clean or conditions
  const getValidationError = (key1, key2) => {
    if (key1 || key2) {
      return key1 || key2;
    }

    return false;
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {window.strings.Dashboard_user || 'User'} -{' '}
          {modalLoading ? '...' : userData ? userData.name : ''}
        </ModalHeader>
        {modalLoading ? (
          <div className="mb-5 mt-4">
            <Loader />
          </div>
        ) : (
          <>
            {userData ? (
              <>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="name">
                        {window.strings.Dashboard_name || 'Name'}
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={userData.name || ''}
                        onChange={handleChangeInput}
                      />
                      {getValidationError(userError.user, respError.name) && (
                        <small className="text-danger">
                          {getValidationError(userError.user, respError.name)}
                        </small>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">
                        {window.strings.Dashboard_email || 'Email'}
                      </Label>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">
                        {window.strings.Dashboard_password || 'Password'}{' '}
                        <small>
                          ({' '}
                          {window.strings.Dashboard_leaveBlankPassword ||
                            'Leave blank to keep existing password'}{' '}
                          )
                        </small>
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {getValidationError(userError.password, respError.password) && (
                        <small className="text-danger">
                          {getValidationError(userError.password, respError.password)}
                        </small>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">
                        {window.strings.Dashboard_country || 'Country'}
                      </Label>
                      <Suspense fallback={<div>loading ...</div>}>
                        <DropDownSelect
                          defaultSelect={setDefaultOptions(userData.country)}
                          onSelect={handleCountrySelect}
                          option={countryOptions}
                          multi={false}
                          blur={true}
                        />
                      </Suspense>

                      {userError.country && (
                        <small className="text-danger">
                          {userError.country}
                        </small>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">
                        {window.strings.Dashboard_position || 'Position'}
                      </Label>
                      <Input
                        type="text"
                        name="position"
                        value={userData.position || ''}
                        placeholder="Position"
                        onChange={handleChangeInput}
                      />
                    </FormGroup>
                  </Form>
                  <p>
                    <small>
                      {window.strings.Dashboard_lastUpdate || 'Last Update'} -{' '}
                      {showMonthDateYear(new Date(userDetails.updated_at))}
                    </small>
                  </p>
                </ModalBody>

                <ModalFooter>
                  <Button color="primary" onClick={updateForm}>
                    {window.strings.Dashboard_update || 'Update'}
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    {window.strings.Dashboard_cancel || 'Cancel'}
                  </Button>
                </ModalFooter>
              </>
            ) : (
              window.strings.Dashboard_userNotFound || 'User Not Found'
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
