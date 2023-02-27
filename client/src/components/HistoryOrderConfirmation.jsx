import React from "react"
import { Row, Col, Table, Button } from "react-bootstrap"
import TransStatus from "./TransStatus"
import { Link } from "react-router-dom"
import { API } from "../config/api"

export default function HistoryOrderConfirmation({
  status,
  total,
  qty,
  tripName,
  country,
  date,
  day,
  night,
  accomodation,
  transportation,
  username,
  phone
}) {
  const handleDelete = async (id) => {
    let request = await API.delete("/transaction/" + id)
    return request
  }
  return (
    <Row>
      <Col
        style={{
          height: "auto",
          marginBottom: "200px",
          marginTop: "1rem",
          border: "2px solid #B7B7B7",
          borderRadius: "10px",
          background: "#FFFFFF",
          padding: "2rem"
        }}
      >
        <Row className="d-flex align-item-center justify-conter-between mb-4 ">
          <Col>
            <Link to={"/"}>
              <img
                alt=""
                src="/IconOrder.svg"
                width="190"
                height="68"
                className="d-inline-block align-top "
              />
            </Link>
          </Col>
          <Col className="col-3">
            <h2 style={{ fontWeight: 800, textAlign: "end" }}>Booking</h2>
            <h4
              style={{ textAlign: "end", color: "#878787", fontWeight: "600" }}
            >
              saturday <span style={{ fontWeight: 200 }}>22,Jul 2022</span>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col md={5} className="d-flex flex-column">
            <h2 style={{ fontWeight: 600 }}>{tripName}</h2>
            <p className="text-muted">{country}</p>
            <h3
              style={{
                background: "orange",
                width: "50%",
                textAlign: "center"
              }}
            >
              {status}
            </h3>
          </Col>
          <Col md={4} className="d-flex flex-wrap">
            <Col className="col-6">
              <h4 style={{ fontWeight: "bold" }}>Date Trip</h4>
              <p className="text-muted">{date}</p>
            </Col>
            <Col className="col-6">
              <h4 style={{ fontWeight: "bold" }}>Duration</h4>
              <p className="text-muted">
                {day} Day {night} Night
              </p>
            </Col>
            <Col className="col-6">
              <h4 style={{ fontWeight: "bold" }}>Accomodation</h4>
              <p className="text-muted">{accomodation}</p>
            </Col>
            <Col className="col-6">
              <h4 style={{ fontWeight: "bold" }}>Transporartion</h4>
              <p className="text-muted">{transportation}</p>
            </Col>
          </Col>
          <Col
            md={2}
            className="d-flex align-item-center flex-column justify-content-center p-5 "
          >
            <img
              alt=""
              src="/qr-code.svg"
              width="190"
              height="68"
              className="d-inline-block align-top "
            />
            <h5 style={{ marginLeft: "4rem", marginTop: "2rem" }}>TCK0101</h5>
          </Col>
        </Row>
        <Row>
          <Table stripped>
            <thead>
              <tr style={{ fontSize: "20px" }}>
                <th>No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "16px" }}>
              <tr className="text-muted">
                <td>1</td>
                <td>{username}</td>
                <td>Laki-Laki</td>
                <td>{phone}</td>
                <th>Qty : {qty}</th>
              </tr>
              <tr className="text-muted">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th style={{ fontSize: "1.5rem" }}>
                  Total:
                  <span style={{ color: "#FF0000" }}>IDR. {total}</span>
                </th>
                <Button
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    background: "rgba(255, 7, 66, 1)",
                    color: "white",
                    border: "none"
                  }}
                  onclick={handleDelete()}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    background: "rgba(10, 207, 131, 1)",
                    color: "white",
                    border: "none"
                  }}
                >
                  Approve
                </Button>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Col>
    </Row>
  )
}
