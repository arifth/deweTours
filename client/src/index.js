import React from "react"
import ReactDOM from "react-dom/client"
import "./scss/App.scss"
import "./App.css"
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query"
import { UserContextProvider } from "./context/userContext"
import { BrowserRouter as Router } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))

// initiate new reactQuery client

const client = new QueryClient()

//  BrowserRouter used for to initiate api used to react router
//  Routes is api used to routes whatever route inside of it
//  Route is api defined path being used for routing to another page inside our app
//  Required props are :
//   path and element
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
