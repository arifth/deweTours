import React, { useState, useEffect, useContext } from "react"
import { Base } from "../../components/Base"
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import { Container, Row, Image, Col, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { API } from "../../config/api"
import { UserContext } from "../../context/userContext"

export default function DetailTour() {
  const navigate = useNavigate()
  const [counter, setCounter] = useState(1)
  const [result, setResult] = useState()

  const [total, setTotal] = useState(0)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [state, dispatch] = useContext(UserContext)
  console.log(state)

  let { id } = useParams()

  let { data: tour } = useQuery("detailCache", async () => {
    try {
      let resp = await API.get("/trip/" + id)
      // console.log(resp)
      return resp.data.data
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    const loggedIn = localStorage.getItem("token")
    if (loggedIn) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleAdder = () => {
    setCounter(() => counter + 1)
    // setResult(counter)
  }

  const handleReducer = () => {
    if (counter > 1) {
      setCounter(() => counter - 1)
    }
  }

  // const handleTotal = (untotaled) => {
  //   let total = parseInt(counter) * parseInt(untotaled)
  //   setResult(total)
  //   return total
  // }

  const handleSubmit = useMutation(async (data) => {
    try {
      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      }
      let result = tour?.price * counter
      let data = new FormData()
      data.append("counter_qty", counter)
      data.append("total", result)
      data.append("trip_id", id)
      data.append("user_id", state.user.id_user)
      const response = await API.post("/transaction", data, config)

      console.log(response.data)

      // navigate("/payment")
      // return response

      const token = response.data.data.token

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result)
          navigate("/payment")
          // window.location.reload()
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result)
          navigate("/payment")
          // window.location.reload()
        },
        onError: function (result) {
          navigate("/payment")
          console.log(result)
        }
      })
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-X1qte313qM27Xpbq"

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransScriptUrl
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey)

    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return (
    <Base>
      <NavBar bgNav={"url(/heroBg.png)"} />
      <Container fluid style={{ width: "90vw" }} className="mb-5">
        <Row>
          <h1
            className="col-12"
            style={{
              textAlign: "start",
              display: "block",
              marginTop: "10rem",
              fontWeight: 800,
              fontSize: "4rem"
            }}
          >
            {tour?.title}
          </h1>
          <h3 col-12 className="text-secondary mb-3">
            {tour?.country?.name}
          </h3>
          <Image
            src={tour?.image}
            className="mb-5"
            height={"500px"}
            style={{
              objectFit: "cover",
              margin: "auto",
              borderRadius: "2rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Image
              src="/img_tours/dum1.jpg"
              height={"230px"}
              width={"500px"}
              rounded
            />
            <Image
              src="/img_tours/dum2.jpg"
              // className="col-4"
              rounded
              height={"230px"}
              width={"500px"}
            />
            <Image
              src="/img_tours/dum3.jpg"
              // className="col-4"
              rounded
              height={"230px"}
              width={"500px"}
            />
          </div>
          <h2 col-12 className="mt-5 mb-5">
            Information Trip
          </h2>
          <Container
            fluid
            className="d-flex gap-5 align-item-center justify-content-between "
            style={{ flexWrap: "wrap" }}
          >
            <Row
              col-12
              className="d-flex align-item-center justify-content-center"
            >
              <Col col-3 className="d-flex flex-column ">
                <h5
                  className="text-secondary"
                  col-12
                  style={{ color: "#A8A8A8" }}
                >
                  Accomodation
                </h5>

                <h3>
                  <Image
                    src="/iconHome.png"
                    height={"25px"}
                    width={"25px"}
                    className="mt-3 me-2"
                    style={{ margin: "auto" }}
                  />
                  {tour?.accomodation}
                </h3>
              </Col>
            </Row>
            <Row
              col-12
              className="d-flex align-item-center justify-content-center"
            >
              <Col col-3 className="d-flex flex-column ">
                <h5
                  className="text-secondary"
                  col-12
                  style={{ color: "#A8A8A8" }}
                >
                  Transportation
                </h5>

                <h3>
                  <Image
                    src="/plane.svg"
                    height={"25px"}
                    width={"25px"}
                    className="mt-3 me-2"
                    style={{ margin: "auto" }}
                  />
                  {tour?.accomodation}
                </h3>
              </Col>
            </Row>

            <Row
              col-12
              className="d-flex align-item-center justify-content-center"
            >
              <Col col-3 className="d-flex flex-column ">
                <h5
                  className="text-secondary"
                  col-12
                  style={{ color: "#A8A8A8" }}
                >
                  Eat
                </h5>

                <h3
                  style={{
                    display: "flex",
                    textAlign: "start",
                    alignItems: "end"
                  }}
                >
                  <Image
                    src="/meal.png"
                    height={"25px"}
                    width={"25px"}
                    className="mt-3 me-2"
                    style={{ margin: "auto" }}
                  />
                  {tour?.eat}
                </h3>
              </Col>
            </Row>

            <Row
              col-12
              className="d-flex align-item-center justify-content-center"
            >
              <Col col-3 className="d-flex flex-column ">
                <h5
                  className="text-secondary"
                  col-12
                  style={{ color: "#A8A8A8" }}
                >
                  Duration
                </h5>

                <h3
                  style={{
                    display: "flex",
                    textAlign: "start",
                    alignItems: "end"
                  }}
                >
                  <Image
                    src="/calendar.png"
                    height={"25px"}
                    width={"25px"}
                    style={{ margin: "auto" }}
                    className="mt-3 me-2"
                  />
                  {tour?.day + "day " + tour?.night + "night"}
                </h3>
              </Col>
            </Row>

            <Row
              col-12
              className="d-flex align-item-center justify-content-center"
            >
              <Col col-3 className="d-flex flex-column ">
                <h5
                  className="text-secondary"
                  col-12
                  style={{ color: "#A8A8A8" }}
                >
                  Trip
                </h5>

                <h3
                  style={{
                    display: "flex",
                    textAlign: "start",
                    alignItems: "end"
                  }}
                >
                  <Image
                    src="/time.png"
                    height={"25px"}
                    width={"25px"}
                    className="mt-3 me-2"
                    style={{ margin: "auto" }}
                  />
                  {tour?.date_trip}
                </h3>
              </Col>
            </Row>
          </Container>

          <h2 col-12 className="mt-5">
            Description
          </h2>
          <h4
            col-12
            className="text-secondary mt-5 mb-5 "
            style={{ lineHeight: "2rem" }}
          >
            {tour?.description}
          </h4>
          <Row
            className="d-flex justify-content-between align-item-center mb-5"
            style={{ borderBottom: "1px solid #B7B7B7" }}
          >
            <h2 className="col-4">
              <span className="text-primary">
                IDR. {tour?.price.toLocaleString()}
              </span>{" "}
              /Person
            </h2>
            <Col
              className="col-2"
              style={{
                alignSelf: "center",
                display: "flex",
                justifyContent: "end"
              }}
            >
              <div className="d-flex align-item-baseline justify-content-baseline ">
                <div onClick={handleReducer} style={{ margin: "auto" }}>
                  <img
                    src="/Minus.png"
                    alt=""
                    srcset=""
                    style={{ marginRight: "1rem", cursor: "Pointer" }}
                  />
                </div>
                <div>
                  <h1 className="text-primary">{counter}</h1>
                </div>

                <div onClick={handleAdder} style={{ margin: "auto" }}>
                  <img
                    src="/Plus.png"
                    alt=""
                    srcset=""
                    style={{ marginLeft: "1rem", cursor: "Pointer" }}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row
            className="d-flex justify-content-between align-item-center mb-5"
            style={{ borderBottom: "1px solid #B7B7B7" }}
          >
            <h2 className="col-4 ">Total</h2>
            <Col
              className="col-4"
              style={{ alignSelf: "end", textAlign: "end" }}
            >
              <h1 className="text-primary">
                {"Rp, " + (tour?.price * counter).toLocaleString()}
              </h1>
            </Col>
          </Row>
          <Row className="d-flex " style={{ justifyContent: "end" }}>
            <Button
              className="text-white "
              style={{
                height: "4rem",
                fontSize: "1.5rem",
                padding: "1rem",
                marginBottom: "3rem",
                width: "50%"
              }}
              onClick={(e) => handleSubmit.mutate(e)}
            >
              Book Now
            </Button>
          </Row>
        </Row>
      </Container>
      <Footer />
    </Base>
  )
}
