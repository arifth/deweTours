import React, { useEffect, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../config/api"

export default function ModalRegister({ show, handleClose }) {
  const navigate = useNavigate()
  const [user, addUser] = useState({
    // id: 0,
    // isLoggedIn: false,
    full_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    address: ""
  })

  const handleRegister = useMutation(async (e) => {
    e.preventDefault()
    // NOTES new implementation using useMutation
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      // data body
      const body = JSON.stringify(user)

      console.log(body)

      // insert user data to database
      const response = await API.post("/register", body, config)
    } catch (error) {
      console.log(error)
    }
    handleClose()
  })

  const handleChange = (e) => {
    const value = e.target.value
    addUser({ ...user, [e.target.name]: value })
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
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
          Register
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
              Full Name
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              name={"full_name"}
              type="text"
              style={{
                background: "#D2D2D2",
                marginBottom: "1rem",
                height: "3rem"
              }}
            />

            <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
              Email
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              name={"email"}
              type="email"
              placeholder="name@example.com"
              style={{
                background: "#D2D2D2",
                marginBottom: "1rem",
                height: "3rem"
              }}
            />
            <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
              Password
            </Form.Label>
            <Form.Control
              // eslint-disable-next-line no-undef
              onChange={handleChange}
              name={"password"}
              type="password"
              style={{
                background: "#D2D2D2",
                marginBottom: "1rem",
                height: "3rem"
              }}
            />
            <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
              Phone
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              name={"phone"}
              type="number"
              style={{
                background: "#D2D2D2",
                marginBottom: "1rem",
                height: "3rem"
              }}
            />

            <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
              Gender
            </Form.Label>
            <Form.Select
              style={{
                height: "3.5rem",
                border: "2px solid #B1B1B1",
                background: "#C4C4C4",
                color: "black"
              }}
              name="gender"
              onChange={handleChange}
            >
              <option></option>
              <option name="gender" value="laki-laki">
                Laki-laki
              </option>
              <option name="gender" value="perempuan">
                perempuan
              </option>
            </Form.Select>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
                Address
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                name={"address"}
                as="textarea"
                rows={3}
                style={{
                  background: "#D2D2D2",
                  marginBottom: "1rem",
                  height: "7rem"
                }}
              />
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link to={"/"}>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            className="text-white"
            onClick={(e) => handleRegister.mutate(e)}
          >
            Register
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}
