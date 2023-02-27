import React, { useState } from "react"
import { Base } from "../../components/Base"
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import { Container, Row, Button } from "react-bootstrap"
import HistoryOrder from "../../components/HistoryOrder"
import ModalConfirmation from "../../components/ModalConfirmation"
import { Link, useParams } from "react-router-dom"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import { UserContext } from "../../context/userContext"
import { useContext } from "react"

export default function Payment({ isLoggedIn, setIsLoggedIn }) {
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/orders")
    return response.data.data
  })

  const [state] = useContext(UserContext)
  let { data: user } = useQuery("transactionCache", async () => {
    const response = await API.get("/user/")
    return response.data.data
  })

  // console.log(state)

  const filtered = transaction?.filter((user) => {
    if (user?.user_id === state?.user.id_user) {
      return user
    }
  })

  console.log(filtered)

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
            {filtered?.map((key) => (
              <HistoryOrder
                status={key?.status}
                total={key?.total}
                qty={key?.counter_qty}
                tripName={key?.trip.title}
                country={key?.trip.country.name}
                date={key?.trip.date_trip}
                day={key?.trip.day}
                night={key?.trip.night}
                accomodation={key?.trip.accomodation}
                transportation={key?.trip.transportation}
                username={key?.user.full_name}
                gender={key?.user.gender}
                phone={key?.user.phone}
              />
            ))}

            <Row className="d-flex justify-content-end">
              <Button
                onClick={handleShow}
                className="text-white align-self-end col-4 "
                style={{
                  height: "4rem",
                  fontSize: "1.5rem",
                  padding: "1rem",
                  marginBottom: "3rem"
                }}
              >
                PAY NOW
              </Button>
            </Row>
          </Row>
        </Container>
        <Footer />
      </Base>
    </>
  )
}
