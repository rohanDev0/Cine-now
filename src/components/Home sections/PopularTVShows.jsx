import { useEffect, useState } from "react";
import "./Homesections.css";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function PopularTVShows({ onMovieClick }) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchPopularTV() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch popular TV shows");
        }

        const data = await response.json();
        setShows(data.results || []);
      } catch (error) {
        console.error("Popular TV Shows error:", error);
      }
    }

    fetchPopularTV();
  }, []);

  if (!shows.length) return null;

  return (
    <section className="home-section popular-tv-section">
      <div className="home-section-header">
        <h2>Popular TV Shows</h2>

        <button className="view-all-button">
          View All ›
        </button>
      </div>

      <div className="home-movie-row">
        {shows.slice(0, 20).map((show) => (
          <button
            key={show.id}
            className="home-movie-card"
            onClick={() =>
              onMovieClick({
                id: show.id,
                type: "tv",
              })
            }
          >
            <div className="home-poster-wrapper">
              {show.poster_path ? (
                <img
                  src={`${IMAGE_URL}${show.poster_path}`}
                  alt={show.name}
                  loading="lazy"
                />
              ) : (
                <div className="home-no-poster">
                  No Poster
                </div>
              )}
            </div>

            <div className="home-movie-info">
              <div className="home-movie-title">
                {show.name}
              </div>

              <div className="home-movie-meta">
                <span>★ {show.vote_average?.toFixed(1) || "N/A"}</span>
                <span>•</span>
                <span>
                  {show.first_air_date
                    ? show.first_air_date.slice(0, 4)
                    : "—"}
                </span>
                <span>•</span>
                <span>TV</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
    }
