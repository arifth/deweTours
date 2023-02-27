import React from "react"
import { Container, Stack } from "react-bootstrap"
import CardTour from "./CardTour"
import { useQuery } from "react-query"
import { API } from "../config/api"

export default function ListTour({ title }) {
  title = "Group of Tours "

  let imgPrefix = "http://localhost:5000/uploads/"

  let { data: trips } = useQuery("toursCache", async () => {
    try {
      let resp = await API.get("/trips")
      //  console.log(resp)
      return resp.data.data
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <h1 style={{ marginLeft: "rem", textAlign: "center" }}>{title}</h1>
      <Container
        className=" d-flex flex-row flex-wrap align-items-center justify-content-center gap-5 p-5 "
        style={{ marginBottom: "5rem", marginTop: "5rem" }}
      >
        {trips == 0 ? (
          <>
            <Stack>
              <img
                src="http://localhost:5000/uploads/kosong.png"
                alt=""
                style={{
                  margin: "auto",
                  Height: "600px",
                  Width: "600px"
                }}
              />
              <h2 style={{ textAlign: "center" }}>Kosong bro :( </h2>
            </Stack>
          </>
        ) : (
          trips?.map((k) => (
            <CardTour
              key={k?.id}
              id={k?.id}
              img={k?.image}
              title_trip={k?.title}
              price={k?.price}
              // country={k?.country}
              quota={k?.quota}
            />
          ))
        )}
      </Container>
    </>
  )
}
