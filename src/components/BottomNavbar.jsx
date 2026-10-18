
import { useState } from "react";
import "./BottomNavbar.css";
function NavIcon({ name }) {
  const common = {
    width: 23,
    height: 23,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9.5V21h14V9.5M9 21v-7h6v7" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      );

    case "tv":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="13" rx="2.2" />
          <path d="m8 2 4 3 4-3M8 21h8M12 18v3" />
        </svg>
      );

    case "movies":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 4l-3 5m9-5-3 5m9-5-3 5M8 15l-3 5m9-5-3 5m9-5-3 5" />
        </svg>
      );

    case "exit":
      return (
        <svg {...common}>
          <path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
          <path d="M14 16l5-4-5-4M19 12H9" />
        </svg>
      );

    default:
      return null;
  }
}

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "search", label: "Search", icon: "search" },
  { id: "tv", label: "TV Shows", icon: "tv" },
  { id: "movies", label: "Movies", icon: "movies" },
];

export default function BottomNavbar({
  activePage = "home",
  onHome,
  onSearch,
  onTVShows,
  onMovies,
}) {
  const [showExitDialog, setShowExitDialog] = useState(false);

  const actions = {
    home: onHome,
    search: onSearch,
    tv: onTVShows,
    movies: onMovies,
  };

  return (
    <>
      <nav className="bottom-navbar" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`bottom-navbar__button${
              activePage === item.id ? " is-active" : ""
            }`}
            aria-label={item.label}
            aria-current={
              activePage === item.id ? "page" : undefined
            }
            onClick={actions[item.id]}
          >
            <NavIcon name={item.icon} />
          </button>
        ))}

        <button
          type="button"
          className="bottom-navbar__button bottom-navbar__exit"
          aria-label="Exit"
          onClick={() => setShowExitDialog(true)}
        >
          <NavIcon name="exit" />
        </button>
      </nav>

      {showExitDialog && (
        <div
          className="bottom-navbar__dialog-backdrop"
          onClick={() => setShowExitDialog(false)}
        >
          <section
            className="bottom-navbar__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bottom-navbar-exit-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="bottom-navbar-exit-title">Leave WNPD?</h2>

            <p>
              Browsers don't allow websites to reliably close
              their own tab or app. You can close this tab
              manually if you'd like to exit.
            </p>

            <div className="bottom-navbar__dialog-actions">
              <button
                type="button"
                className="bottom-navbar__dialog-button"
                onClick={() => setShowExitDialog(false)}
              >
                Stay here
              </button>

              <button
                type="button"
                className="bottom-navbar__dialog-button is-primary"
                onClick={() => {
                  setShowExitDialog(false);
                  onHome?.();
                }}
              >
                Go Home
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
            }
