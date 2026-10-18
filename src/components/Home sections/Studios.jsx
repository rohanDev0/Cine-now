import { useEffect, useState } from "react";
import "./Homesections.css";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function Studios() {
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    async function fetchStudios() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        const data = await response.json();

        const details = await Promise.all(
          (data.results || []).slice(0, 10).map(async (movie) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
              {
                headers: {
                  Authorization: `Bearer ${TMDB_TOKEN}`,
                  accept: "application/json",
                },
              }
            );

            return res.ok ? res.json() : null;
          })
        );

        const studioMap = new Map();

        details.forEach((movie) => {
          movie?.production_companies?.forEach((company) => {
            if (!studioMap.has(company.id)) {
              studioMap.set(company.id, company);
            }
          });
        });

        setStudios(Array.from(studioMap.values()).slice(0, 12));
      } catch (error) {
        console.error("Studios error:", error);
      }
    }

    fetchStudios();
  }, []);

  if (!studios.length) return null;

  return (
    <section className="home-section studios-section">
      <div className="home-section-header">
        <h2>Studios</h2>

        <button className="view-all-button">
          View All ›
        </button>
      </div>

      <div className="home-movie-row">
        {studios.map((studio) => (
          <div className="home-movie-card studio-card" key={studio.id}>
            <div className="home-poster-wrapper studio-logo-wrapper">
              {studio.logo_path ? (
                <img
                  src={`${IMAGE_URL}${studio.logo_path}`}
                  alt={studio.name}
                  loading="lazy"
                />
              ) : (
                <div className="home-no-poster">
                  {studio.name}
                </div>
              )}
            </div>

            <div className="home-movie-info">
              <div className="home-movie-title">
                {studio.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
