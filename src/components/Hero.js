import React from "react";

// IMAGE, TEXT and MORE
export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>MoveGreen</h1>
        <p>Continuamos reinventando a roda</p>
        {children}
      </div>
    </div>
  );
}
