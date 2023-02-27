import { useState } from "react"
import { Alert } from "react-bootstrap"
import { useMutation } from "react-query"

import { API } from "../../config/api"

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [message, setMessage] = useState(null)

  const { email, password } = form

  // insert data from backend using following function

  const handleSubmit = useMutation(async (e) => {
    try {
      // configure content-type
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      // data body
      const body = JSON.stringify(form)
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      )
      setMessage(alert)
      console.log(error)
    }
  })
}
