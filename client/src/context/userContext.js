import { createContext, useReducer } from "react"

export const UserContext = createContext()

const initialState = {
  isLogin: false,
  user: {}
  // user: { id: 1, full_name: "", email: "", password: "", image: "" }
}

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      console.log(payload)

      localStorage.setItem(
        "image",
        "http://localhost:5000/uploads/" + payload.image
      )
      localStorage.setItem("token", payload.token)
      localStorage.setItem("role", payload.role)
      return {
        isLogin: true,
        user: payload
      }
    case "LOGOUT":
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      return {
        isLogin: false,
        user: {}
      }
    default:
      throw new Error()
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
