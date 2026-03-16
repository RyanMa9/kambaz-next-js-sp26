"use client";

import { Modal, Button } from "react-bootstrap";

export default function AssignmentDeleteModal({
  show,
  handleClose,
  handleDelete,
}: {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>This cannot be reversed.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
