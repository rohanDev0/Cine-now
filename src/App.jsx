import { useEffect, useState } from "react";
import TmdbButton from "./components/tmdbButton";
import logo from "./assets/logo.png";
import { getEmbedUrl } from "./config/servers.js";
import ServerButton from "./components/Serverbutton.jsx";
import Loader from "./components/loader.jsx";
import lago from "./assets/lago.png";
import TVControls from "./components/Tvcontrol.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Maintainance from "./components/Maintainance.jsx";
import PasswordGate from "./components/PasswordGate.jsx";
import SiteFooter from "./components/Footer.jsx";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;
import MaintenanceControl from "./components/MaintenanceControl.jsx";
import HomeHero from "./components/HomeHero.jsx";
import SearchPage from "./components/SearchPage.jsx";
import Background from "./components/bg.jsx";
import PopularTVShows from "./components/Home sections/PopularTVShows.jsx";
import Studios from "./components/Home sections/Studios.jsx";
//import CinenowLogo from "./components/CinenowLogo.jsx";
import BottomNavbar from "./components/BottomNavbar.jsx";

const TMDB_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";


function MovieCard({ movie, onClick }) {
  const title = movie.title || movie.name;
  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4) ||
    "";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  const type =
    movie.media_type === "tv" || movie.first_air_date
      ? "TV"
      : "Movie";

  return (
    <button
      className="movie-card"
      onClick={() =>
        onClick({
          id: movie.id,
          type: movie.media_type || "movie",
        })
      }
    >
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">No Poster</div>
        )}
      </div>

      <div className="movie-info">
        <div className="movie-title">{title}</div>

        <div className="movie-meta">
          <span>★ {rating}</span>
          {year && <span>•</span>}
          {year && <span>{year}</span>}
          <span>•</span>
          <span>{type}</span>
        </div>
      </div>
    </button>
  );
}
/* function MovieCard({ movie, onClick }) {
  return (
    <button
      className="movie-card"
      onClick={() =>
        onClick({ id: movie.id, type: movie.media_type || "movie" })
      }
    >
      {movie.poster_path ? (
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title || movie.name}
          loading="lazy"
        />
      ) : (
        <div className="no-poster">No Poster</div>
      )}

      <div className="movie-title">{movie.title || movie.name}</div>
    </button>
  );
} */

function GenreRow({ title, movies, onMovieClick }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="genre-section">
      <h2>{title}</h2>

      <div className="movie-row">
        {movies.slice(0, 20).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </section>
  );
}
function Home({
  movies,
  genreMovies,
  loading,
  error,
  onMovieClick,
  search,
  setSearch,
  handleSearch,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <>
  <main className="home">
    <header className="header">
    <CinenowLogo />

      <div className="site-owner">ЯR</div>
      

      <div className="tmdbButton">
        <TmdbButton />
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />
    </header>

    {loading && <Loader />}

    {error && (
      <div className="message error">
        {error}
      </div>
    )}

    {!loading && !error && movies.length > 0 && (
      <>
        <HomeHero
          movies={movies}
          onMovieClick={onMovieClick}
        />

        <GenreRow
  title="Popular Now"
  movies={movies}
  onMovieClick={onMovieClick}
/>
        <PopularTVShows
          title="Popular Tv Shows"
  onMovieClick={onMovieClick}
/>

          <GenreRow
  title="Thriller"
  movies={genreMovies.thriller}
  genreId={53}
  onMovieClick={onMovieClick}
/>

<GenreRow
  title="Adventure"
  movies={genreMovies.adventure}
  genreId={12}
  onMovieClick={onMovieClick}
/>

<GenreRow
  title="Sci-Fi"
  movies={genreMovies.sciFi}
  genreId={878}
  onMovieClick={onMovieClick}
/>

<GenreRow
  title="Mystery"
  movies={genreMovies.mystery}
  genreId={9648}
  onMovieClick={onMovieClick}
/>
      </>
    )}
  </main>
    </>
);
}
  /* return (
    <main className="home">
      <header className="header">
        <button
          className="site-logo-button"
          onClick={() => {
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
        >
          <img src={logo} alt="Watchmovspd" className="site-logo" />
        </button>
        <div className="site-owner">ЯR</div>
        <div className="tmdbButton">
          <TmdbButton />
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
        <p>Popular Now-</p>
      </header>

      {loading && <Loader />}

      {error && <div className="message error">{error}</div>}

      {!loading && !error && (
        <section className="movie-grid">
          {movies.slice(0, 20).map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
          ))}
        </section>
      )}
    </main>
  );
} */

function Watch({ movieId, movie, mediaType, onBack }) {
  /* const mediaType = movie?.media_type || "movie"; */

  const [selectedServer, setSelectedServer] = useState("bingr");
  const [server, setServer] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(movie || null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error to load movie details.");
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (err) {
        console.error(err);
      }
    }

    getMovieDetails();
  }, [movieId, mediaType]);
  useEffect(() => {
    if (mediaType !== "tv") return;

    async function getEpisodes() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${movieId}/season/${selectedSeason}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load episodes.");
        }

        const data = await response.json();

        setEpisodes(data.episodes || []);
      } catch (err) {
        console.error(err);
        setEpisodes([]);
      }
    }

    getEpisodes();
  }, [movieId, mediaType, selectedSeason]);

  // details end
  useEffect(() => {
    async function getSimilarMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movieId}/recommendations?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("error 404 to load similar movies.");
        }

        const data = await response.json();
        setSimilarMovies((data.results || []).slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    }

    getSimilarMovies();
  }, [movieId, mediaType]);
  //similarmovend
  //end

  useEffect(() => {
    const url = getEmbedUrl({
  serverId: selectedServer,
  movieId,
  mediaType,
  selectedSeason,
  selectedEpisode,
});

    if (url) {
      setServer(url);
    }
  }, [selectedSeason, selectedEpisode, selectedServer, mediaType, movieId]);

  const handleServerSelect = (serverId) => {
    const url = getEmbedUrl({
  serverId,
  movieId,
  mediaType,
  selectedSeason,
  selectedEpisode,
});

    if (!url) {
      alert("ServerError404.");
      return;
    }
    setSelectedServer(serverId);
    setServer(url);
  };

  /* if (!server) {
    return (
      <main className="watch">
        <header className="watch-navbar">
          <div className="watch-logo">WMPD</div>
          <div className="watch-nav-action">
            <button className="watch-nav-button">🔍︎</button>
            <button className="watch-nav-button">☰</button>
          </div>
        </header>

        <ServerSelect onClose={onBack} onSelect={handleServerSelect} />
      </main>
    );
  }
*/
  return (
    <main className="watch">
      <header className="watch-navbar">
        <div className="watch-logo">
          <img src={lago} alt="Cinenow" />
          <span>Cinenow</span>
        </div>

        <div className="watch-nav-actions">
          <button className="watch-nav-button">🔍</button>

          <div className="watch-menu-wrap">
            <button
              className="watch-nav-button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              ☰
            </button>

            {menuOpen && (
              <div className="watch-menu-dropdown">
                <button
                  className="watch-menu-item"
                  onClick={() => {
                    setMenuOpen(false);
                    onBack();
                  }}
                >
                  Home
                </button>
                <button
                  className="watch-menu-item"
                  onClick={() => {
                    setMenuOpen(false);
                    if (window.Capacitor?.isNativePlatform?.()) {
                      window.Capacitor.Plugins?.App?.exitApp?.();
                    } else {
                      window.close();
                    }
                  }}
                >
                  Exit
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      
        <section className="watch-player">
          <iframe
            title="Movie Player"
            src={server}
            allowfullscreen
            allow="autoplay; encrypted-media; fullscreen;"
          />
        </section>
      

      <section className="mov-info">
        <h1>
          {mediaType === "tv"
            ? movieDetails?.name || "TV Show"
            : movieDetails?.title || "Movie"}
        </h1>

        {mediaType === "tv" && (
          <TVControls
            seasons={movieDetails?.seasons}
            episodes={episodes}
            selectedSeason={selectedSeason}
            selectedEpisode={selectedEpisode}
            onSeasonChange={(season) => {
              setSelectedSeason(season);
              setSelectedEpisode(1);
            }}
            onEpisodeChange={setSelectedEpisode}
          />
        )}

        <div className="mov-meta">
          <span>⭐ {movieDetails?.vote_average?.toFixed(1) || "N/A"}</span>
          <span>•</span>
          <span>{movieDetails?.release_date?.slice(0, 4) || "N/A"}</span>
        </div>

        <div className="mov-genre">
          🎭{" "}
          {movieDetails?.genres?.map((genre) => genre.name).join(" • ") ||
            "N/A"}
        </div>

        <div className="mov-description">
          {movieDetails?.overview || "No Data Available at the moment."}
        </div>

        {movieDetails?.imdb_id && (
          <a
            className="imdb-button"
            href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            More info ↗
          </a>
        )}
      </section>
      <section className="other-servers">
        <h3>Other Servers</h3>

        <div className="server-buttons">
          <ServerButton
            servers={[
              { id: "bingr", name: "binge" },
              { id: "vidlove", name: "VidL" },
              { id: "cinesrc", name: "cinema" },
              { id: "filmu", name: "Film(hin)" },
              { id: "nxsha", name: "space" },
              { id: "watchembed", name: "helipad" },
              { id: "vidstuck", name: "Vidnow" },
              { id: "cinezo", name: "CineZ" },
              { id: "yapgrid", name: "YepMov" }, 
            ]}
            selectedServer={selectedServer}
            onSelect={handleServerSelect}
          />
        </div>
      </section>

      <section className="more-like-this">
        <h2>Similar Movies</h2>

        <div className="similar-mov-grid">
          {similarMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={(id) => {
                window.history.pushState({}, "", `/watch/${id}`);
                window.location.reload();
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

/* const MAINTAINANCE_MODE = false; */
export default function App() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [unlocked, setUnlocked] = useState(() => {
    const unlockTime = localStorage.getItem("Cinenow_unlock_time");

    if (!unlockTime) return false;

    const eightHours = 8 * 60 * 60 * 1000;
    const elapsed = Date.now() - Number(unlockTime);

    if (elapsed < eightHours) {
      return true;
    }

    localStorage.removeItem("Cinenow_unlock_time");
    return false;
  });

  /* if (MAINTAINANCE_MODE) {
    return <Maintainance />;
  }
  
  if (!unlocked) {
  return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }
  */
  const getMovieIdFromUrl = () => {
    const match = window.location.pathname.match(/\/watch\/(movie|tv)\/(\d+)$/);

    if (!match) return null;

    return {
      type: match[1],
      id: match[2],
    };
  };
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(
      window.location.pathname
      );
  
  const initialRoute = getMovieIdFromUrl();

  const [movieId, setMovieId] = useState(initialRoute?.id || null);
  const [mediaType, setMediaType] = useState(initialRoute?.type || "movie");
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreMovies, setGenreMovies] = useState({
  thriller: [],
  adventure: [],
  sciFi: [],
  mystery: [],
});

  useEffect(() => {
    async function getMovies() {
      try {
        if (!TMDB_TOKEN) {
          throw new Error("TMDB token is missing. Check your .env file.");
        }

        const response = await fetch(TMDB_URL, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`TMDB request failed: ${response.status}`);
        }

        const data = await response.json();

        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);

  // 👇 PUT THE SEARCH FUNCTION HERE
  /* async function handleSearch() {
    const query = searchQuery.trim();

    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        query: query,
        language: "en-US",
        page: "1",
        include_adult: "false",
      });

      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("TMDB ERROR:", data);
        throw new Error(
          `TMDB request failed: ${response.status} ${
            data.status_message || ""
          }`,
        );
      }
      const results = (data.results || [])
        .filter(
          (item) => item.media_type === "movie" || item.media_type === "tv",
        )
        .slice(0, 18);

      setMovies(results);
    } catch (err) {
      console.error(err);
      setError(err.message || "Search failed.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }
*/
  //end of search function
  async function handleSearch() {
  const query = searchQuery.trim();

  if (!query) return;
    
const encodedQuery = encodeURIComponent(query);

window.history.pushState({}, "", `/search/${encodedQuery}`);
setCurrentPath(`/search/${encodedQuery}`);

  setSearchLoading(true);
  setError("");

  try {
    const params = new URLSearchParams({
      query: query,
      language: "en-US",
      page: "1",
      include_adult: "false",
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `TMDB request failed: ${response.status} ${
          data.status_message || ""
        }`,
      );
    }

    const results = (data.results || [])
      .filter(
        (item) =>
          item.media_type === "movie" ||
          item.media_type === "tv",
      )
      .slice(0, 18);

    setSearchResults(results);
  } catch (err) {
    console.error(err);
    setError(err.message || "Search failed.");
  } finally {
    setTimeout(() => {
      setSearchLoading(false);
    }, 3000);
  }
  }
  //search ended
  useEffect(() => {
  const handlePopState = () => {
    const route = getMovieIdFromUrl();

    setCurrentPath(window.location.pathname);

    setMovieId(route?.id || null);
    setMediaType(route?.type || "movie");
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, []);
  /* useEffect(() => {
    const handlePopState = () => {
      setMovieId(getMovieIdFromUrl());
      setMovieId(route?.id || null);
      setMediaType(route?.type || "movie");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); */
  //roload end
  useEffect(() => {
  const fetchGenreMovies = async () => {
  try {
    const genres = {
      thriller: 53,
      adventure: 12,
      sciFi: 878,
      mystery: 9648,
    };

    const results = await Promise.all(
      Object.entries(genres).map(async ([key, genreId]) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${key} movies`);
        }

        const data = await response.json();

        return [key, data.results || []];
      })
    );

    setGenreMovies(Object.fromEntries(results));
  } catch (error) {
    console.error("Genre movies error:", error);
  }
}; fetchGenreMovies();
}, []); // runs once
  //end
  /* if (MAINTAINANCE_MODE) {
  return <Maintainance />;
} 
  if (maintenanceMode) {
  return <Maintenance />;
}

if (!unlocked) {
  return <PasswordGate onUnlock={() => setUnlocked(true)} />;
}
  
    
  if (movieId) {
    return (
      <Watch
        movieId={movieId}
        movie={movies.find((m) => m.id === Number(movieId))}
        mediaType={mediaType}
        onBack={() => {
          window.history.pushState({}, "", "/");
          setMovieId(null);
        }}
      />
    );
  }

*/
  /*  return (
    <>
     <MaintenanceControl
        onMaintenanceChange={setMaintenanceMode}
      />
    
    <Home
      movies={movies}
      loading={loading}
      error={error}
      onMovieClick={(movie) => {
        setMovieId(movie.id);
        setMediaType(movie.type);
        window.history.pushState({}, "", `/watch/${movie.type}/${movie.id}`);
      }}
      search={search}
      setSearch={setSearch}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleSearch={handleSearch}
    />
   </>
  );
}  */
  return (
    <>
      <Background />
      
      <MaintenanceControl onMaintenanceChange={setMaintenanceMode} />

      {maintenanceMode ? (
        <Maintainance />
      ) : !unlocked ? (
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      ) : movieId ? (
        <Watch
          movieId={movieId}
          movie={movies.find((m) => m.id === Number(movieId))}
          mediaType={mediaType}
          onBack={() => {
            window.history.pushState({}, "", "/");
            setMovieId(null);
          }}
        /> 
      ) : currentPath === "/search" ||
  currentPath.startsWith("/search/") ? (
  <SearchPage
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    handleSearch={handleSearch}
    searchResults={searchResults}
    loading={searchLoading}
    error={error}
    onMovieClick={(movie) => {
      setMovieId(movie.id);
      setMediaType(movie.type);

      window.history.pushState(
        {},
        "",
        `/watch/${movie.type}/${movie.id}`,
      );
    }}
  />
    ) : currentPath === "/sports" ? (
  <main className="sports-page">
    <div className="sports-player-container">
      <iframe
        title="Sports Live Player"
        src="https://yonotv.pages.dev/LINK?id=IND5"
        className="sports-iframe"
        allowFullScreen
        allow="encrypted-media; picture-in-picture"
        scrolling="no"
        frameBorder="0"
      />
    </div>
  </main>
    ) : currentPath === "/tv" ? (
  <main className="home">
    <PopularTVShows
      title="Popular TV Shows"
      onMovieClick={(movie) => {
        setMovieId(movie.id);
        setMediaType("tv");
        window.history.pushState(
          {},
          "",
          `/watch/tv/${movie.id}`
        );
        setCurrentPath(`/watch/tv/${movie.id}`);
      }}
    />
  </main>
      ) : (
        <Home
          movies={movies}
          genreMovies={genreMovies}
          loading={loading}
          error={error}
          onMovieClick={(movie) => {
            setMovieId(movie.id);
            setMediaType(movie.type);
            window.history.pushState(
              {},
              "",
              `/watch/${movie.type}/${movie.id}`,
            );
          }}
          search={search}
          setSearch={setSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      )}
            <BottomNavbar
  activePage={
    currentPath.startsWith("/search/")
      ? "search"
      : currentPath.startsWith("/tv")
        ? "tv"
        : currentPath === "/"
          ? "home"
          : ""
  }
  onHome={() => {
  window.history.pushState({}, "", "/");
  setCurrentPath("/");
  setMovieId(null);
  setMediaType("movie");
  setSearchQuery("");
}}
  onSearch={() => {
    window.history.pushState({}, "", "/search");
    setCurrentPath("/search");
  }}
  onSports={() => {
  window.history.pushState({}, "", "/sports");
  setCurrentPath("/sports");
  setMovieId(null);
}}
  onTVShows={() => {
    window.history.pushState({}, "", "/tv");
    setCurrentPath("/tv");
  }}
/>
      <SiteFooter />
    </>
  );
}
