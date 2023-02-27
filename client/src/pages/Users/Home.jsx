import React from "react"
import { Base } from "../../components/Base"
import Hero from "../../components/Hero"
import TestisCard from "../../components/TestisCard"
import Footer from "../../components/Footer"
import ListTour from "../../components/ListTour"
// import { API } from "../../config/api"
// import { useQuery } from "react-query"

export default function Home({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Base>
      <Hero isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TestisCard />
      <ListTour />
      <Footer />
    </Base>
  )
}
