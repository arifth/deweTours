import React, { useState } from "react"
import { Base } from "../../components/Base"
import Footer from "../../components/Footer"
import ListTour from "../../components/ListTour"
import NavBar from "../../components/NavBar"
import { Col, Row, Button, Modal, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../../config/api"

export default function IncomeTrip({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [country, addCountry] = useState({
    name: ""
  })
  console.log(country)

  const handleButton = () => {
    navigate("/addTrip")
  }

  const handleCountry = () => {
    setShow(true)
  }

  const handleHide = () => {
    setShow(false)
  }
  const handleChange = (e) => {
    const value = e.target.value
    addCountry({ name: value })
  }

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault()
    // NOTES new implementation using useMutation
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      // data body
      const body = JSON.stringify(country)

      console.log(body)

      // insert user data to database
      await API.post("/country", body, config)
      // return response
    } catch (error) {
      console.log(error)
    }
    handleHide()
  })

  const title = "add Trip"
  return (
    <Base>
      <Modal show={show} onHide={handleHide}>
        <img
          src="/leftFlower.png"
          alt=""
          style={{ height: "200px", width: "200px", position: "absolute" }}
        />

        <img
          src="/rightFlower.png"
          alt=""
          style={{
            height: "100px",
            width: "100px",
            position: "absolute",
            right: 0,
            top: 0
          }}
        />

        <Modal.Header>
          <Modal.Title
            className="mx-auto"
            style={{ borderBottom: "none", fontSize: "3rem" }}
          >
            Add Country
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
                Add New Country
              </Form.Label>
              <Form.Control
                name="country"
                onChange={handleChange}
                type="text"
                placeholder="Indonesia"
                style={{
                  background: "#D2D2D2",
                  marginBottom: "1rem",
                  height: "3rem"
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit.mutate(e)}
            style={{ width: "100%" }}
            className="text-white"
          >
            Add Country
          </Button>
        </Modal.Footer>
      </Modal>
      <NavBar bgNav={"url(/heroBg.png)"} />
      <Row style={{ marginTop: "18rem" }}>
        <Col className="col-8 text-primary"></Col>
        <Col className="col-4">
          <Button onClick={handleButton}>add Trip</Button>
          <Button onClick={handleCountry} style={{ marginLeft: "1rem" }}>
            add Country
          </Button>
        </Col>
      </Row>
      <ListTour title={title} />
      <Footer />
    </Base>
  )
}
