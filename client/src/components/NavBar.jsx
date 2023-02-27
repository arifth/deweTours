import React, { useContext, useState } from "react"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { Button } from "react-bootstrap"
import ModalRegister from "./ModalRegister"
import ModalLogin from "./ModalLogin"
import { Link } from "react-router-dom"
import ProfileThumb from "./ProfileThumb"
import { UserContext } from "../context/userContext"

function NavBar({ bgNav }) {
  const [showreg, setShowreg] = useState(false)

  // const [loggedIn, setIsLoggedIn] = useState(false)
  const [state, dispatch] = useContext(UserContext)

  const role = localStorage.getItem("role")

  const handleOpenReg = () => {
    setShowreg(true)
    setShowLog(false)
  }

  const [showLog, setShowLog] = useState(false)

  const handleCloseLog = () => {
    setShowLog(false)
  }

  const handleOpenLog = () => {
    setShowLog(true)
  }

  const handleCloseReg = () => {
    setShowreg(false)
  }

  return (
    <>
      <div style={{ display: "none" }}>{}</div>
      <ModalRegister show={showreg} handleClose={handleCloseReg} />
      <ModalLogin handleClose={handleCloseLog} show={showLog} />
      <Navbar
        style={{
          background: bgNav,
          top: 0,
          position: "absolute",
          zIndex: 3,
          width: "100vw"
        }}
      >
        <Container className="d-flex align-items-center">
          <Navbar.Brand>
            <Link to={"/"}>
              <img
                alt=""
                src="/icon.png"
                width="190"
                height="68"
                className="d-inline-block align-top "
              />
            </Link>
          </Navbar.Brand>
          <div
            style={{ alignSelf: "end" }}
            className="d-flex align-item-center mb-3"
          >
            {role === "USER" || role === "ADMIN" ? (
              <ProfileThumb />
            ) : (
              <>
                <Button
                  className="me-3 text-white"
                  onClick={handleOpenReg}
                  style={{
                    width: "6rem",
                    background: "transparent",
                    border: "1px solid white"
                  }}
                >
                  Register
                </Button>
                <Button
                  onClick={handleOpenLog}
                  className="bg-primary text-white"
                  style={{ width: "6rem" }}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
