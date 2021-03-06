import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Table,
} from "reactstrap";

import countryOptions from "../../../utils/CountryOptions";

export default function CountryISOModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.modalStatus(!modal);
    setModal(!modal);
  };

  useEffect(() => {
    setModal(props.active);
  }, [props.active]);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {window.strings.Dashboard_countryIosCode || "Country ISO Code"}
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>{window.strings.Dashboard_country || "Country"}</th>
                <th>{window.strings.Dashboard_iosCode || "ISO Code"}</th>
              </tr>
            </thead>
            <tbody>
              {countryOptions.map((country, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{country.label}</th>
                    <td>{country.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            {window.strings.Dashboard_cancel || "Cancel"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
