import React, { useState } from "react";
import "./PasswordGate.css";
import lago from "../assets/lago.png";

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  
const handleSubmit = async (e) => {
  e.preventDefault();

    try {
    const response = await fetch("https://Cinenow-auth.rohantemp9.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setWrong(false);

      localStorage.setItem(
        "Cinenow_unlock_time",
        Date.now().toString()
      );

      onUnlock();
    } else {
      setWrong(true);
    }
  } catch (error) {
    console.error("Auth error:", error);
    setWrong(true);
  }
};
/*
    if (password === "") {
      setWrong(false);
      localStorage.setItem(
    "Cinenow_unlock_time",
    Date.now().toString()
  );
      onUnlock();
    } else {
      setWrong(true);
    }
  }; */

  return (
    <div className="password-gate">

      <div className="gate-content">

        {/* Cinenow LOGO */}
        <img
          className="gate-logo"
          src={lago}
          alt="Cinenow"
        />

        {/* TITLE */}
        <div className="gate-title">
          <span>ENTER</span>
          <span className="green-text"> KEY</span>
        </div>

        <p className="gate-subtitle">
          ACCESS IS NOT GIVEN.
        </p>

        {/* PASSWORD */}
        <form onSubmit={handleSubmit} className="gate-form">

          <div className={`password-box ${wrong ? "wrong" : ""}`}>

            <span className="lock-icon">🔒</span>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setWrong(false);
              }}
              placeholder="Enter password"
              autoComplete="off"
            />

            

          </div>

          <button type="submit" className="enter-button">
            ENTER
          </button>

        </form>

        {wrong && (
          <p className="wrong-key">
            WRONG KEY . ACCESS DENIED XD
          </p>
        )}

      </div>

    </div>
  );
}

export default PasswordGate;
