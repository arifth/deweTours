import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
export default function CardTour({
  id,
  img,
  quota,
  title_trip,
  price,
  country
}) {
  return (
    <>
      <Card
        style={{ maxWidth: "350px", padding: "10px", marginBottom: "10px" }}
        className="d-flex flex-column justify-content-center align-item-center "
      >
        {/* <Card.Img variant="top" src="/img_tours/{img}.png" /> */}
        <Card.Img
          variant="top"
          src={img}
          style={{
            height: "240px",
            width: "328px",
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 0,
            background: "#ffffff",
            fontWeight: 500,
            borderRadius: "5px",
            height: "30px",
            width: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItem: "center"
          }}
        >
          <h5>{quota}</h5>
        </div>

        <Card.Body>
          <Card.Title>
            <Link
              to={`/detail-tour/${id}`}
              className="text-black"
              style={{ textDecoration: "none" }}
            >
              {title_trip}
            </Link>
          </Card.Title>
          <div
            className="d-flex justify-content-between"
            style={{
              alignSelf: "end",
              width: "100%",
              marginTop: "2rem",
              padding: 0
            }}
          >
            <Card.Text className="text-primary" style={{ bottom: 2 }}>
              IDR. {price.toLocaleString()}
            </Card.Text>
            <Card.Text className="text-muted" style={{ bottom: 2 }}>
              {country}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
