import { useEffect, useRef, useState } from "react";
import "./HomeHero.css";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

// Standard TMDB genre ids -> names, so the hero can show a genre
// without an extra API call per movie.
const GENRE_NAMES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function HomeHero({ movies, onMovieClick }) {
  const heroMovies = movies?.slice(0, 7) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movieLogos, setMovieLogos] = useState({});
  const touchStartX = useRef(0);
const touchEndX = useRef(0);

const handleTouchStart = (e) => {
  touchStartX.current = e.touches[0].clientX;
};

const handleTouchEnd = (e) => {
  touchEndX.current = e.changedTouches[0].clientX;

  const distance = touchStartX.current - touchEndX.current;

  if (Math.abs(distance) < 50) return;

  if (distance > 0) {
    setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
  } else {
    setCurrentIndex(
      (prev) => (prev - 1 + heroMovies.length) % heroMovies.length
    );
  }
};

  useEffect(() => {
    if (heroMovies.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroMovies.length]);

  useEffect(() => {
    if (heroMovies.length === 0) return;

    const fetchLogos = async () => {
      try {
        const results = await Promise.all(
          heroMovies.map(async (movie) => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}/images`,
                {
                  headers: {
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                    accept: "application/json",
                  },
                }
              );

              if (!response.ok) return [movie.id, null];

              const data = await response.json();

              const logo =
                data.logos?.find((item) => item.iso_639_1 === "en") ||
                data.logos?.find((item) => item.iso_639_1 === null) ||
                data.logos?.[0];

              return [
                movie.id,
                logo?.file_path
                  ? `https://image.tmdb.org/t/p/w500${logo.file_path}`
                  : null,
              ];
            } catch {
              return [movie.id, null];
            }
          })
        );

        setMovieLogos(Object.fromEntries(results));
      } catch (error) {
        console.error("Hero logos error:", error);
      }
    };

    fetchLogos();
  }, [heroMovies.length]);

  if (heroMovies.length === 0) return null;

  const movie = heroMovies[currentIndex];

  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4) ||
    "";

  const genreName = GENRE_NAMES[movie.genre_ids?.[0]];

  return (
    <div
      className="home-hero-wrapper"
      style={{
        "--hero-bg": movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
      }}
    >
      <section className="home-hero"
         onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd} 
        >
    
      {/* Every hero backdrop is stacked here; only the active one is
          visible, and CSS fades the swap instead of cutting instantly. */}
      <div className="home-hero-backdrops">
        {heroMovies.map((heroMovie, index) => {
          const backdrop = heroMovie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
            : null;

          return (
            <div
              key={heroMovie.id}
              className={`home-hero-backdrop ${
                index === currentIndex ? "active" : ""
              }`}
              style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
            />
          );
        })}
        <div className="home-hero-gradient" />
      </div>

      <div className="home-hero-content" key={movie.id}>
        {movieLogos[movie.id] ? (
          <img
            className="hero-title-logo"
            src={movieLogos[movie.id]}
            alt={movie.title || movie.name}
          />
        ) : (
          <h1>{movie.title || movie.name}</h1>
        )}

        <div className="hero-meta">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          {year && <span>{year}</span>}
          {genreName && <span>{genreName}</span>}
        </div>

        <p>
          {movie.overview ||
            "Discover something new to watch tonight."}
        </p>

        <div className="hero-buttons">
          <button
            className="hero-play-button"
            aria-label="Play"
            onClick={() =>
              onMovieClick({
                id: movie.id,
                type: movie.media_type || "movie",
              })
            }
          >
            ▶
          </button>

          <button
            className="hero-info-button"
            onClick={() =>
              onMovieClick({
                id: movie.id,
                type: movie.media_type || "movie",
              })
            }
          >
            <span className="hero-info-icon">ⓘ</span> See More
          </button>
        </div>

        <div className="hero-dots">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
    </div>
    
  );
}

export default HomeHero;



