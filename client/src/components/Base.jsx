import React from "react"

export const Base = ({ children }) => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        background: "#F5F5F5",
        width: "100vw",
        height: "auto",
        zIndex: 1,
        position: "absolute",
        overflow: "hidden",
        fontFamily: "Open sans"
      }}
    >
      {children}
    </div>
  )
}
