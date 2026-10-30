export function getEmbedUrl({
  serverId,
  movieId,
  mediaType,
  selectedSeason,
  selectedEpisode,
}) {

    const TV = mediaType === "tv";
  
    const servers = {
      
      vfst: `https://vidfast.vc/movie/${movieId}?theme=16A085&autoPlay=true`,
      vesy: TV
        ? `https://player.videasy.net/tv/${movieId}/${selectedSeason}/${selectedEpisode}`
        : `https://player.videasy.net/movie/${movieId}`,

      serc: `https://www.2embed.cc/embed/${movieId}`,

      framextv: TV
        ? `https://framextv.tech/embed/${movieId}/${selectedSeason}/${selectedEpisode}`
        : `https://framextv.tech/embed/${movieId}`,
      filmu: TV
        ? `https://embed.filmu.in/tv/${movieId}/${selectedSeason}/${selectedEpisode}`
        : `https://embed.filmu.in/movie/${movieId}`,
      bingr: TV
        ? `https://bingr.one/watch/movie/${movieId}/${selectedSeason}/${selectedEpisode}`
        : `https://bingr.one/watch/movie/${movieId}`,
      cinesrc: TV
        ? `https://cinesrc.st/embed/tv/${movieId}?s=${selectedSeason}&e=${selectedEpisode}`
        : `https://cinesrc.st/embed/movie/${movieId}`,
      autoembed: `https://player.autoembed.app/embed/movie/${movieId}`,
      vidbolt: TV
        ? `https://vidbolt.xyz/tv/${movieId}/${selectedSeason}/${selectedEpisode}?autoPlay=true&audio=hindi`
        : `https://vidbolt.xyz/movie/${movieId}?autoPlay=true&audio=hindi&theme=3BB031`,

      peachify: TV
        ? `https://peachify.top/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}`
        : `https://peachify.top/embed/movie/${movieId}`,

      peachify: TV
        ? `https://peachify.top/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}`
        : `https://peachify.top/embed/movie/${movieId}`,
      screenscape: TV
        ? `https://screenscape.me/embed?tmdb=${movieId}&type=tv&s=${selectedSeason}&e=${selectedEpisode}&lan=hindi`
        : `https://screenscape.me/embed?tmdb=${movieId}&type=movie&lan=hindi`,
      watchembed: TV
        ? `https://watch.embed-api.stream/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}`
        : `https://watch.embed-api.stream/embed/movie/${movieId}`,
      yapgrid: TV
        ? `https://yapgrid.com/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}?autoplay=1`
        : `https://yapgrid.com/embed/movie/${movieId}?autoplay=1`,
      cinezo: TV
      ? `https://player.cinezo.live/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}`
      : `https://player.cinezo.live/embed/movie/${movieId}?autoplay=true&poster=true&chromecast=true&servericon=false&setting=true&pip=false&download=true&font=Roboto&fontcolor=6f63ff&fontsize=20&opacity=0.5&primarycolor=00ffff&secondarycolor=0a0a12&iconcolor=ffffff`,
    vidlove: TV ?
       `https://player.vidlove.cc/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}?player=mc-capsule&primarycolor=3fa35a&secondarycolor=0f1411&iconcolor=f2f7f3&icon=streaming&pip=false&fontsize=21&opacity=0.1`
      : `https://player.vidlove.cc/embed/movie/${movieId}?player=mc-capsule&primarycolor=3fa35a&secondarycolor=0f1411&iconcolor=f2f7f3&icon=streaming&pip=false&fontsize=21&opacity=0.1`,
    vidstuck: TV? 
      `https://vidstuck.xyz/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}?branding=Cinenow+&loading=2&back=true`
      : `https://vidstuck.xyz/embed/movie/${movieId}?branding=Cinenow+&loading=2&back=true`,
    nxsha: TV? 
      `https://nxsha.space/embed/tv/${movieId}/${selectedSeason}/${selectedEpisode}?disable_dl_button=true&disable_app_ad=true&color=green`
      : `https://nxsha.space/embed/movie/${movieId}?disable_dl_button=true&disable_app_ad=true&color=green`,
    };


  return servers[serverId] || null;
}
