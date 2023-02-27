import React, { useState } from "react"
import { Base } from "../components/Base"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Container, Row, Button, Table, Col } from "react-bootstrap"
import HistoryOrder from "../components/HistoryOrder"
import ModalConfirmation from "../components/ModalConfirmation"

export default function PaymentWaitingApproval({ isLoggedIn, setIsLoggedIn }) {
  const props = {}
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <ModalConfirmation
        setShow={handleShow}
        setHide={handleClose}
        show={show}
      />
      <Base>
        <NavBar
          bgNav={"url(/heroBg.png)"}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Container
          fluid
          style={{ width: "80vw", marginTop: "10px" }}
          className="mb-5 "
        >
          <Row>
            <Col
              style={{
                marginTop: "20rem",
                height: "auto",
                marginBottom: "200px",
                marginTop: "10rem",
                border: "2px solid #B7B7B7",
                borderRadius: "10px",
                background: "#FFFFFF",
                padding: "2rem"
              }}
            >
              <Row className="d-flex align-item-center justify-conter-between mb-4 ">
                <Col>
                  {/* <Link to={"/"}> */}
                  <img
                    alt=""
                    src="/IconOrder.svg"
                    width="190"
                    height="68"
                    className="d-inline-block align-top "
                  />
                  {/* </Link> */}
                </Col>
                <Col className="col-3">
                  <h2 style={{ fontWeight: 800, textAlign: "end" }}>Booking</h2>
                  <h4
                    style={{
                      textAlign: "end",
                      color: "#878787",
                      fontWeight: "600"
                    }}
                  >
                    saturday{" "}
                    <span style={{ fontWeight: 200 }}>22,Jul 2022</span>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col md={5} className="d-flex flex-column">
                  <h2 style={{ fontWeight: 600 }}>6D/4N Fun Tassie Vacation</h2>
                  <p className="text-muted">Australia</p>

                  <h5
                    style={{
                      color: "#FF9900",
                      background: "rgba(255,153,0,0.2)",
                      width: "180px",
                      height: "40px",
                      textAlign: "center"
                    }}
                  >
                    waiting Approval
                  </h5>

                  {/* <TransStatus /> */}
                </Col>
                <Col md={4} className="d-flex flex-wrap">
                  <Col className="col-6">
                    <h4 style={{ fontWeight: "bold" }}>Date Trip</h4>
                    <p className="text-muted">26 August 2020</p>
                  </Col>
                  <Col className="col-6">
                    <h4 style={{ fontWeight: "bold" }}>Duration</h4>
                    <p className="text-muted">6 Day 4 Night</p>
                  </Col>
                  <Col className="col-6">
                    <h4 style={{ fontWeight: "bold" }}>Accomodation</h4>
                    <p className="text-muted">Hotel 4 Nights</p>
                  </Col>
                  <Col className="col-6">
                    <h4 style={{ fontWeight: "bold" }}>Transporartion</h4>
                    <p className="text-muted">Qatar Airways</p>
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
                  <h5 style={{ marginLeft: "4rem", marginTop: "2rem" }}>
                    proof.jpg
                  </h5>
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
                      <td>Radif Ganteng</td>
                      <td>Male</td>
                      <td>083896833112</td>
                      <th>Qty : 1</th>
                    </tr>
                    <tr className="text-muted">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <th style={{ fontSize: "1.5rem" }}>
                        Total:{" "}
                        <span style={{ color: "#FF0000" }}>
                          IDR. 12,398,000
                        </span>
                      </th>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Base>
    </>
  )
}
