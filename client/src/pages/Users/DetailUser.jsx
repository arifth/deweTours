import React from "react"
import { Base } from "../../components/Base"
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import { Container, Row, Image, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import HistoryOrder from "../../components/HistoryOrder"
// import { UserContext } from "../../context/userContext"
import { useParams } from "react-router-dom"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import QRCode from "react-qr-code"

export default function DetailUser({ isLoggedIn, setIsLoggedIn }) {
  let { id } = useParams()

  const navigate = useNavigate()
  const imgPrefix = "http://localhost:5000/uploads/"

  const [input, setInput] = React.useState({ image: "" })

  id = parseInt(id)

  let { data: profile } = useQuery("profileCache", async () => {
    let data = await API.get(`/user/${id}`)
    return data.data.data
  })

  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/orders")
    return response.data.data
  })

  // console.log(profile)
  // console.log(transaction?.[0].user_id)

  const filtered = transaction?.filter((trans) => {
    if (trans?.user_id === id) {
      return trans
    }
  })
  console.log(typeof filtered)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append("image", input.image)
    const post = await API.post("/userProfile/" + id, data)

    console.log(post)
    localStorage.setItem("imgProf", "http://localhost:5000/uploads/" + "image")
    navigate("/detail-user/" + id)
    return post
  }

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setInput({ ...input, [e.target.name]: e.target.files[0] })
    }
    console.log(input)
  }

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
          style={{ width: "80vw", marginTop: "3rem", border: "none" }}
          className="mb-5 p-2 "
        >
          <Row>
            <Row
              className="card mx-auto"
              style={{
                maxWidth: "1200px",
                marginBottom: "200px",
                marginTop: "10rem",
                border: "none"
              }}
            >
              <div className="row g-0">
                <div className="card-body col-6">
                  <h5
                    className="card-title mb-5"
                    style={{ fontWeight: 800, fontSize: "2.5rem" }}
                  >
                    Personal Info
                  </h5>

                  <div className="d-flex mb-3">
                    <div>
                      <Image
                        fluid
                        src="/personalIcon1.png"
                        alt=""
                        height={"50px"}
                        width={"50x"}
                        style={{ marginRight: "1rem" }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <h4 style={{ fontWeight: 500 }}>{profile?.name}</h4>
                      </div>
                      <div>
                        <h5 className="text-muted">Full Name</h5>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-3 ">
                    <div>
                      <Image
                        fluid
                        src="/local_post_office.svg"
                        alt=""
                        height={"50px"}
                        width={"50x"}
                        style={{ marginRight: "1rem" }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <h4 style={{ fontWeight: 500 }}>{profile?.email}</h4>
                      </div>
                      <div>
                        <h5 className="text-muted">Email</h5>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-3">
                    <div>
                      <Image
                        fluid
                        src="/local_phone.png"
                        alt=""
                        height={"50px"}
                        width={"50x"}
                        style={{ marginRight: "1rem" }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <h4 style={{ fontWeight: 500 }}>{profile?.phone}</h4>
                      </div>
                      <div>
                        <h5 className="text-muted">Mobile Phone</h5>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-5">
                    <div>
                      <Image
                        fluid
                        src="/place.png"
                        alt=""
                        height={"50px"}
                        width={"50x"}
                        style={{ marginRight: "1rem" }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <h4 style={{ fontWeight: 500 }}>{profile?.address}</h4>
                      </div>
                      <div>
                        <h5 className="text-muted">Address</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-3 mt-2 overflow-hidden"
                  style={{ borderRadius: "10px" }}
                >
                  <img
                    src="/photoBg.png"
                    className=" rounded-start mt-3"
                    alt="..."
                    style={{
                      borderRadius: "10px",
                      objectFit: "cover",
                      overflow: "hidden",
                      height: "400px",
                      width: "300px",
                      maxWidth: "100%"
                    }}
                  />
                  <Row className="d-flex ">
                    <Form.Group controlId="formFile">
                      <Form.Control
                        type="file"
                        onChange={handleChange}
                        name="image"
                      />
                    </Form.Group>
                    <Button
                      className="text-white mt-2 "
                      style={{
                        height: "auto",
                        fontSize: "1.5rem",
                        padding: "1rem",
                        marginBottom: "1rem"
                      }}
                      onClick={handleSubmit}
                    >
                      <Link
                        to={"/payment"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Change Photo Profile
                      </Link>
                    </Button>
                  </Row>
                </div>
              </div>
            </Row>
          </Row>

          <h2 className="mb-1">History Trip </h2>
          {filtered?.map((order) => (
            <HistoryOrder
              status={order?.status}
              total={order?.total}
              qty={order?.counter_qty}
              tripName={order?.trip.title}
              country={order?.trip.country.name}
              date={order?.trip.date_trip}
              day={order?.trip.day}
              night={order?.trip.night}
              accomodation={order?.trip.accomodation}
              transportation={order?.trip.transportation}
              username={order?.user.full_name}
              phone={order?.user.phone}
              attachment={order?.ID}
            />
          ))}
        </Container>
        <Footer />
      </Base>
    </>
  )
}
