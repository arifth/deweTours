import React, { useState, useEffect } from "react"
import { Base } from "../../components/Base"
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import "./IncomingTrips.css"
import { Container, Row, Table, Button, Modal } from "react-bootstrap"
import HistoryOrderConfirmation from "../../components/HistoryOrderConfirmation"
import "./IncomingTrips.css"
import { useQuery } from "react-query"
import { API } from "../../config/api"

export default function IncomingTrips({ isLoggedIn, setIsLoggedIn }) {
  const [show, setShow] = useState(false)
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/orders")
    return response.data.data
  })

  console.log(transaction)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  return (
    <>
      <Base>
        <NavBar
          bgNav={"url(/heroBg.png)"}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Container
          fluid
          style={{ width: "90vw", marginTop: "10rem" }}
          className="mb-5 "
        >
          <Row style={{ marginBottom: "80vh" }}>
            <Table striped bordered hover>
              <thead style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                <tr>
                  <th>No</th>
                  <th>Users</th>
                  <th>Trips</th>
                  <th>Bukti Transfer</th>
                  <th>Status Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((k) => {
                  return (
                    <tr>
                      <td>{k.ID}</td>
                      <td>{k.user.full_name}</td>
                      <td>{k.trip.title}</td>
                      <td>proof.png</td>
                      <td>{k.status}</td>
                      <td>
                        <Button
                          onClick={handleShow}
                          style={{ background: "none", border: "none" }}
                        >
                          <img src="/search.png" alt="" />
                        </Button>
                      </td>
                      <Modal
                        id="approvement-modal"
                        show={show}
                        centered
                        onHide={handleClose}
                        className="rounded-0"
                        dialogClassName="approvement-modals"
                      >
                        <Modal.Body>
                          <HistoryOrderConfirmation
                            status={k.status}
                            total={k.total}
                            qty={k.counter_qty}
                            tripName={k.trip.title}
                            country={k.trip.country.name}
                            date={k.trip.date_trip}
                            day={k.trip.day}
                            night={k.trip.night}
                            accomodation={k.trip.accomodation}
                            transportation={k.trip.transportation}
                            username={k.user.full_name}
                            phone={k.user.phone}
                          />
                        </Modal.Body>
                      </Modal>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
        <Footer />
      </Base>
    </>
  )
}
