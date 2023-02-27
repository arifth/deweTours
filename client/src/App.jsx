import React from "react"
import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Home from "./pages/Users/Home"
import DetailTour from "./pages/Users/DetaiTour"
import DetailUser from "./pages/Users/DetailUser"
import Payment from "./pages/Users/Payment"
import IncomingTrips from "./pages/Admin/IncomingTrips"
import PrivateLogin from "./components/PrivateLogin"
import PrivateLoginAdmin from "./components/PrivateLoginAdmin"
import AddTrip from "./pages/Admin/AddTrip"
import IncomeTrip from "./pages/Admin/IncomeTrip"
import PaymentWaitingApproval from "./components/PaymentWaitingApproval"
import { useContext } from "react"
import { UserContext } from "./context/userContext"
import { useEffect } from "react"
import { API, setAuthToken } from "./config/api"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {
    console.log(state.isLogin)
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    if (state.user.isLogin === false) {
      navigate("/")
    } else {
      if (state.user.role === "ADMIN" && state.isLogin === true) {
        navigate("/IncomingTransaction")
      } else if (state.user.role === "USER" && state.isLogin === true) {
        navigate("/")
      }
    }
  }, [state])

  const checkUser = async () => {
    try {
      const response = await API.get("/checkAuth")

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR"
        })
      }
      console.log(response.data.data)
      // Get user data
      let payload = response.data.data
      // Get token from local storage
      payload.token = localStorage.token

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      checkUser()
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-tour/:id" element={<DetailTour />} />

        {/* Private Login Route User */}
        <Route
          element={
            <PrivateLogin isLoggedIn={state.isLogin} role={state.user.role} />
          }
        >
          <Route path="/detail-user/:id" element={<DetailUser />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/detail-tour" element={<DetailTour />} />
          <Route path="/pendingApproval" element={<PaymentWaitingApproval />} />
        </Route>
        {/* Private Login Admin */}
        <Route
          element={
            <PrivateLoginAdmin
              isLoggedIn={state.isLogin}
              role={state.user.role}
            />
          }
        >
          <Route path="/IncomingTransaction" element={<IncomingTrips />} />
          <Route path="/incomeTrip" element={<IncomeTrip />} />
          <Route path="/addTrip" element={<AddTrip />} />
        </Route>
      </Routes>
    </>
  )
}
