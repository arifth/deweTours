import React from "react"

import { Row, Col, Image } from "react-bootstrap"

export default function InfoDetail() {
  return (
    <Row col-12 className="d-flex align-item-center justify-content-center">
      <Col col-3 className="d-flex flex-column ">
        <h5 className="text-secondary" col-12 style={{ color: "#A8A8A8" }}>
          Accomodation
        </h5>

        <h3
          style={{
            display: "flex",
            textAlign: "start",
            alignItems: "end"
          }}
        >
          <Image
            src="/iconHome.png"
            height={"25px"}
            width={"25px"}
            className="mt-3 me-2"
          />
          Hotel 4 Nights{" "}
        </h3>
      </Col>
    </Row>
  )
}
