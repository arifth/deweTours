import { Card, Row } from "react-bootstrap"

function TestisCard(props) {
  return (
    <Row
      className="container-fluid d-flex flex-wrap flex-row gap-5 justify-content-center text-center"
      style={{ marginBottom: "3rem" }}
    >
      <Card
        s={12}
        style={{ width: "280px", marginTop: "-3rem", marginBottom: "1.5rem" }}
        className="d-flex align-items-center px-3 py-3"
      >
        <Card.Img
          variant="top"
          src="/heart1.png"
          style={{ height: "70px", width: "70px", objectFit: "contain" }}
        />
        <Card.Body>
          -
          <Card.Title>
            <h3>Best Price Guarantee</h3>
          </Card.Title>
          <Card.Text style={{ height: "200px" }}>
            <p style={{ textOverflow: "ellipsis" }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid,
              sed.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card
        style={{ width: "280px", marginTop: "-3rem", marginBottom: "1.5rem" }}
        className="d-flex align-items-center px-3 py-3"
      >
        <Card.Img
          variant="top"
          src="/agent_1.png"
          style={{ height: "70px", width: "70px", objectFit: "contain" }}
        />
        <Card.Body>
          -
          <Card.Title>
            <h3>Travellers Love Us</h3>
          </Card.Title>
          <Card.Text>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, cumque?
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        style={{ width: "280px", marginTop: "-3rem", marginBottom: "1.5rem" }}
        className="d-flex align-items-center px-3 py-3"
      >
        <Card.Img
          variant="top"
          src="/guarantee1.svg"
          style={{ height: "70px", width: "70px", objectFit: "contain" }}
        />
        <Card.Body>
          -
          <Card.Title>
            <h3>Best Travel Agent</h3>
          </Card.Title>
          <Card.Text>
            <p>A small river named Duren flows by their place and supplies</p>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card
        style={{ width: "280px", marginTop: "-3rem", marginBottom: "1.5rem" }}
        className="d-flex align-items-center px-3 py-3"
      >
        <Card.Img
          variant="top"
          src="/Group.png"
          style={{ height: "70px", width: "70px", objectFit: "contain" }}
        />
        <Card.Body>
          -
          <Card.Title>
            <h3>Our Dedicated Support</h3>
          </Card.Title>
          <Card.Text>
            <p>A small river named Duren flows by their place and supplies</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  )
}

export default TestisCard
