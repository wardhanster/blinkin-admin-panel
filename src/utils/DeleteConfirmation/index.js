import React, { useState, useEffect } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function DeleteConfirmation(props) {
  const { newToggle, deleteUser, showStatus } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => {
    newToggle(!modal);
    setModal(!modal);
  };

  useEffect(() => {
    setModal(showStatus);
  }, [showStatus]);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete</ModalHeader>
      <ModalBody>
        <p>Are you sure to Delete User records ? </p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={deleteUser}>
          Delete
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
}
