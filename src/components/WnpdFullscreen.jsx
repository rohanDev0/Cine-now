import React, { useRef, useState } from "react";

function WnpdFullscreen({ children }) {
  const playerRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return (
    <div
      ref={playerRef}
      className={`wnpd-fullscreen ${fullscreen ? "is-fullscreen" : ""}`}
    >
      {children}

      <button
        type="button"
        className="wnpd-fullscreen-button"
        onClick={toggleFullscreen}
      >
        {fullscreen ? "⛶" : "⛶"}
      </button>
    </div>
  );
}

export default WnpdFullscreen;
