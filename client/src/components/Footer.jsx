import React from "react"

export default function Footer() {
  return (
    <div
      className="bg-primary mt-5 d-flex align-item-center justify-content-center text-white p-2"
      style={{
        bottom: 0,
        width: "100vw",
        height: "40px",
        position: "absolute"
      }}
    >
      Copyright @ 2020 Dewe Tour - Your Name - NIS. All Rights reserved
      <img
        src="/leaf.png"
        alt=""
        srcset=""
        style={{ position: "absolute", bottom: 0, right: 0 }}
      />
    </div>
  )
}
