import React, { useContext } from "react"
import { Image, Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserContext } from "../context/userContext"

export default function ProfileThumb({ setTrigger }) {
  const role = localStorage.getItem("role")

  const pp = localStorage.getItem("image")

  const [state, dispatch] = useContext(UserContext)

  const handleLOgOut = () => {
    dispatch({
      type: "LOGOUT"
    })
  }

  console.log(state.user.image)

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{
          borderRadius: "20px",
          backgroundColor: "transparent",
          border: "none"
        }}
        rounded
      >
        <Image
          src="/agent_1.png"
          style={{
            height: "65px",
            width: "65px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "2px solid yellow"
          }}
        />
      </Dropdown.Toggle>

      {role === "USER" ? (
        <Dropdown.Menu className="p-4 mt-3">
          <img
            src="/polygon.png"
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 1,
              marginTop: "-16px"
            }}
          />
          <Dropdown.Item>
            <Link
              to={`/detail-user/${state?.user.id_user}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3 style={{ fontWeight: 600 }}>
                <span>
                  <img src="/DropIcon1.png" alt="" className="me-2" />
                </span>
                Profile
              </h3>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item style={{ borderBottom: "1px solid #A8A8A8" }}>
            <Link
              to={"/payment"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3 style={{ fontWeight: 600 }}>
                <span>
                  <img src="/DropIcon2.png" alt="" className="me-2" />
                </span>
                Pay
              </h3>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item style={{ marginTop: "1rem" }}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={handleLOgOut}
            >
              <h3 style={{ fontWeight: 600 }}>
                <span>
                  <img src="/logout.png" alt="" className="me-2" />
                </span>
                Log Out
              </h3>
            </button>
          </Dropdown.Item>
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu className="p-4 mt-3">
          <img
            src="/polygon.png"
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 1,
              marginTop: "-16px"
            }}
          />
          <Dropdown.Item>
            <Link
              to={"/incomeTrip"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3 style={{ fontWeight: 600 }}>
                <span>
                  <img src="/DropIcon1.png" alt="" className="me-2" />
                </span>
                Trip
              </h3>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item style={{ marginTop: "1rem" }}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={handleLOgOut}
            >
              <h3 style={{ fontWeight: 600 }}>
                <span>
                  <img src="/logout.png" alt="" className="me-2" />
                </span>
                Log Out
              </h3>
            </button>
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  )
}
