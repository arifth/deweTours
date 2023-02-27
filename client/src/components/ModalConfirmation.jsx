import React from "react"
import { Modal, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function ModalConfirmation({ setShow, setHide, show, hide }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>
          Your payment will be confirmed within 1 x 24 hours to see your orders
          <span style={{ color: "green" }}>
            <Link to={"/pendingApproval"}> click Here</Link>
          </span>
          thank you
        </h4>
      </Modal.Body>
    </Modal>
  )
}
