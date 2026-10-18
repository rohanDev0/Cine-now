import React from "react";
import "./serverbutton.css";

function Serverbutton({ servers, selectedServer, onSelect }) {
  return (
    <div className="watch-server-buttons">
      {servers.map((server) => (
        <button
          key={server.id}
          type="button"
          className={`watch-server-button ${
            selectedServer === server.id ? "active" : ""
          }`}
          onClick={() => onSelect(server.id)}
        >
          {server.name}
        </button>
      ))}
    </div>
  );
}

export default Serverbutton;
