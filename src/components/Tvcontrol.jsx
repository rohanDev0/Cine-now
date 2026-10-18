function TVControls({
  seasons,
  episodes,
  selectedSeason,
  selectedEpisode,
  onSeasonChange,
  onEpisodeChange,
}) {
  return (
    <div className="tv-controls">
      <select
        value={selectedSeason}
        onChange={(e) => onSeasonChange(Number(e.target.value))}
      >
        {seasons
          ?.filter((season) => season.season_number > 0)
          .map((season) => (
            <option
              key={season.id}
              value={season.season_number}
            >
              {season.name}
            </option>
          ))}
      </select>

      <select
        value={selectedEpisode}
        onChange={(e) => onEpisodeChange(Number(e.target.value))}
      >
        {episodes?.map((episode) => (
          <option
            key={episode.id}
            value={episode.episode_number}
          >
            Episode {episode.episode_number} — {episode.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TVControls;
