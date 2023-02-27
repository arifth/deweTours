import React from "react"
import { InputGroup, Form } from "react-bootstrap"
import NavBar from "./NavBar"

export default function Hero({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      <NavBar
        bgNav={"tranparent"}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div
        style={{
          zIndex: 2,
          width: "100vw",
          height: "100vh",
          top: 0,
          background: `url(/heroBg.png)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center "
        }}
      >
        <div
          style={{
            position: "absolute",
            background: "rgba(2, 1, 2, 0.6)",
            height: "100vh",
            width: "100%"
          }}
        >
          <div
            className="container-fluid "
            style={{ paddingTop: "12rem", marginLeft: "13rem" }}
          >
            <h1
              className="display-5 fw-bold text-white"
              style={{ fontSize: "7rem" }}
            >
              Explore
            </h1>
            <p
              className="col-md-8 text-white"
              style={{
                fontSize: "3.5rem",
                fontWeight: "lighter",
                letterSpacing: "2px"
              }}
            >
              YOUR AMAZING CITY TOGETHER
            </p>
            <label className="text-white mb-3" style={{ fontSize: "1.5rem" }}>
              Find Great Places to Holiday
            </label>
            <InputGroup
              className="mb-3 col-12 "
              style={{ width: "80%", height: "40px" }}
            >
              <Form.Control />

              <InputGroup.Text
                id="basic-addon2"
                className="bg-primary border-0 text-white"
              >
                SEARCH
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </div>
    </>
  )
}
