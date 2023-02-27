import React, { useEffect, useState } from "react"
import { Modal, Button, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { useMutation } from "react-query"
import "react-toastify/dist/ReactToastify.css"
import { API } from "../config/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext"

export default function ModalLogin({
  show,
  handleOpen,
  handleClose,
  // setIsLoggedIn
  redirect
  // setTrigger
}) {
  const notifyUser = () => toast("you are logging in as user")

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [state, dispatch] = useContext(UserContext)
  const [invalid, toggleInvalid] = useState(false)

  // console.log(state)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
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
      // NOTE: stringify doesnt affect axios
      const body = JSON.stringify(user)

      // insert user data to database
      const response = await API.post("/login", body, config)
      console.log(response)

      if (response.data.code === 200 && response.data.data.role === "USER") {
        const payload = response.data.data
        handleClose()
        console.log(response)
        notifyUser()
        navigate("/")
        // console.log(payload)
        return dispatch({
          type: "LOGIN_SUCCESS",
          payload: payload
        })
      } else if (
        response.data.code === 200 &&
        response.data.data.role === "ADMIN"
      ) {
        const payload = response.data.data
        // handleClose()
        console.log(response)
        // notifyUser()
        navigate("/IncomingTransaction")
        // console.log(payload)
        return dispatch({
          type: "LOGIN_SUCCESS",
          payload: payload
        })
      }
    } catch (error) {
      // console.log(error)
      toggleInvalid(true)
    }
  })

  return (
    <>
      <ToastContainer />
      <Modal show={show} onShow={handleOpen} onHide={handleClose} centered>
        {/* <Modal show={show}  centered> */}
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
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "800", fontSize: "24px" }}>
                Email
              </Form.Label>
              <Form.Control
                name="email"
                onChange={handleChange}
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
                name="password"
                type="password"
                onChange={handleChange}
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
            Login
          </Button>

          <Row style={{ width: "100%" }}>
            <h3
              style={{ fontWeight: 300, textAlign: "center" }}
              className={"text-muted"}
            >
              Don't have an account?{" "}
              <span style={{ fontWeight: 800, cursor: "pointer" }}>
                <a onClick={redirect}>Klik Here</a>
              </span>
            </h3>

            {!invalid ? (
              <></>
            ) : (
              <h4 style={{ color: "red", textAlign: "center" }}>
                Email atau password salah{" "}
              </h4>
            )}
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  )
}
