import React from "react"
import { Row, Col, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function HistoryOrder({
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
  phone,
  attachment
}) {
  return (
    <Row>
      <Col
        style={{
          height: "auto",
          marginBottom: ".5rem",
          marginTop: "10rem",
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

            {status === "success" ? (
              <h3
                style={{
                  width: "30%",
                  background: "green",
                  textAlign: "center",
                  height: "40px",
                  borderRadius: ".5rem"
                }}
              >
                {status}
              </h3>
            ) : (
              <h3
                style={{
                  width: "30%",
                  background: "orange",
                  textAlign: "center",
                  height: "40px",
                  borderRadius: ".5rem"
                }}
              >
                {status}
              </h3>
            )}
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
              src="/proof.jpg"
              width="190"
              height="200"
              className="d-inline-block align-top "
              style={{ border: "1px solid grey" }}
            />
            <h5 style={{ marginLeft: "4rem", marginTop: "2rem" }}>proof.jpg</h5>
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
                <td>laki-laki</td>
                <td>{phone}</td>
                <th>Qty : {qty}</th>
              </tr>
              <tr className="text-muted">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th style={{ fontSize: "1.5rem" }}>
                  Total: <span style={{ color: "#FF0000" }}>IDR {total}</span>
                </th>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Col>
    </Row>
  )
}
