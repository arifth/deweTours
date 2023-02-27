import React, { useEffect, useState } from "react"
import { Base } from "../../components/Base"
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import { Container, Row, Button, Form, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../../config/api"
import { useQuery } from "react-query"

export default function AddTrip({ isLoggedIn, setIsLoggedIn }) {
  let { data: country } = useQuery("countryCache", async () => {
    const response = await API.get("/countries")
    return response.data.data
  })

  const navigate = useNavigate()
  const [input, setInput] = React.useState({
    id: 0,
    title_trip: "",
    duration: "",
    country: "",
    accomodation: "",
    transportation: "",
    eat: "",
    duration_day: "",
    duration_night: "",
    date_trip: "",
    price: 0,
    quota: "",
    desc: "",
    image: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append("title", input.title_trip)
    data.append("country", 1)
    data.append("accomodation", input.accomodation)
    data.append("transportation", input.accomodation)
    data.append("eat", input.eat)
    data.append("day", input.duration_day)
    data.append("night", input.duration_night)
    data.append("date_trip", input.date_trip)
    data.append("price", input.price)
    data.append("quota", input.quota)
    data.append("description", input.desc)
    data.append("image", input.image)

    console.log(data)

    const post = await API.post("/trip", data)
    navigate("/incomeTrip")
    return post
  }

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setInput({ ...input, [e.target.name]: e.target.files[0] })
    } else {
      setInput({ ...input, [e.target.name]: e.target.value })
    }

    console.log(input)
  }
  return (
    <Base>
      <NavBar
        bgNav={"url(/heroBg.png)"}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Container
        fluid
        style={{ width: "80vw", height: "200vh" }}
        className="mb-5 "
      >
        <Row style={{ marginTop: "10rem", marginBottom: "2rem" }}>
          <Col className="col-4">
            <h2>Add Trip</h2>
          </Col>
          <Col className="col-8"></Col>
        </Row>
        <Form style={{ width: "80vw" }} encType={"multipart/form-data"}>
          <Form.Group className="mb-3" controlId="formBasicTitleTrip">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Title Trip
            </Form.Label>
            <Form.Control
              required
              name="title_trip"
              value={input.title_trip}
              onChange={handleChange}
              type="text"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Select
            style={{
              height: "3.5rem",
              border: "2px solid #B1B1B1",
              background: "#C4C4C4",
              color: "black"
            }}
            name="countryid"
            onChange={handleChange}
          >
            {country?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Form.Select>

          {/* <Form.Group className="mb-3" controlId="formBasicTitleCountry">
            <Form.Label
              style={{ fontWeight: 500, fontSize: "1.5rem" }}
            ></Form.Label>
            <Form.Select
              required
              name="country"
              value={input.country}
              onChange={handleChange}
              type="text"
              placeholder="Indonesia"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            >
              {country?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicTitleAccomodation">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Accomodation
            </Form.Label>
            <Form.Control
              required
              name="accomodation"
              value={input.accomodation}
              onChange={handleChange}
              type="text"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitleTransportation">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Transportation
            </Form.Label>
            <Form.Control
              required
              name="transportation"
              value={input.transportation}
              onChange={handleChange}
              type="text"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitleEat">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Eat
            </Form.Label>
            <Form.Control
              required
              name="eat"
              value={input.eat}
              onChange={handleChange}
              type="text"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitleTrip">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Duration
            </Form.Label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Form.Control
                required
                name="duration_day"
                value={input.duration_day}
                onChange={handleChange}
                type="number"
                style={{
                  width: "30%",
                  height: "3.5rem",
                  border: "2px solid #B1B1B1",
                  background: "#C4C4C4",
                  color: "black"
                }}
              />
              <h2>Day</h2>
              <Form.Control
                required
                name="duration_night"
                value={input.duration_night}
                onChange={handleChange}
                type="number"
                style={{
                  width: "30%",
                  height: "3.5rem",
                  border: "2px solid #B1B1B1",
                  background: "#C4C4C4",
                  color: "black"
                }}
              />
              <h3>Night</h3>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitleEat">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Date Trip
            </Form.Label>
            <Form.Control
              required
              name="date_trip"
              value={input.date_trip}
              onChange={handleChange}
              type="date"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitleEat">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Price
            </Form.Label>
            <Form.Control
              required
              name="price"
              value={input.price}
              onChange={handleChange}
              type="number"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitleEat">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Quota
            </Form.Label>
            <Form.Control
              required
              name="quota"
              value={input.quota}
              onChange={handleChange}
              type="text"
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitleEat">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Description
            </Form.Label>
            <Form.Control
              required
              name="desc"
              value={input.desc}
              onChange={handleChange}
              as="textarea"
              rows={3}
              style={{
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
            />
          </Form.Group>

          <Form.Group controlId="formFileSm" className="mb-5">
            <Form.Label>Image Attachement</Form.Label>
            <Form.Control
              multiple
              required
              name="image"
              value={input.img}
              onChange={handleChange}
              type="file"
              size="sm"
              style={{
                width: "30%",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black",
                height: "3.5em"
              }}
            />
          </Form.Group>

          <Row>
            <Row className="d-flex justify-content-end">
              <Button
                onClick={handleSubmit}
                type="submit"
                className="text-white align-self-end col-4 "
                style={{
                  fontSize: "1.5rem",
                  padding: "1rem",
                  marginBottom: "3rem",
                  height: "5rem"
                }}
              >
                Add Trip
              </Button>
            </Row>
          </Row>
        </Form>
      </Container>
      <Footer />
    </Base>
  )
}
