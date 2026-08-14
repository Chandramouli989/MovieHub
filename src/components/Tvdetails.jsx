import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";
import { asyncloadtv, removetv } from "../Store/actions/tvActions";

const Tvdetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  // Function to generate streaming platform URLs
  const getStreamingPlatformUrl = (providerName, tvShowTitle) => {
    const title = encodeURIComponent(tvShowTitle || '');
    
    switch (providerName.toLowerCase()) {
      case 'netflix':
        return `https://www.netflix.com/search?q=${title}`;
      case 'amazon prime video':
      case 'prime video':
        return `https://www.primevideo.com/search?queryText=${title}`;
      case 'disney plus':
      case 'disney+':
        return `https://www.disneyplus.com/search?query=${title}`;
      case 'hulu':
        return `https://www.hulu.com/search?query=${title}`;
      case 'hbo max':
      case 'max':
        return `https://play.max.com/search?query=${title}`;
      case 'apple tv':
      case 'apple tv+':
        return `https://tv.apple.com/search?term=${title}`;
      case 'peacock':
        return `https://www.peacocktv.com/search?query=${title}`;
      case 'paramount+':
      case 'paramount plus':
        return `https://www.paramountplus.com/search?search=${title}`;
      case 'youtube':
      case 'youtube premium':
        return `https://www.youtube.com/results?search_query=${title}`;
      case 'google play':
        return `https://play.google.com/store/search?q=${title}&c=tv`;
      case 'itunes':
        return `https://itunes.apple.com/search?term=${title}&media=tvShow`;
      case 'vudu':
        return `https://www.vudu.com/content/search?searchString=${title}`;
      case 'microsoft store':
        return `https://www.microsoft.com/en-us/search?q=${title}`;
      default:
        // For unknown platforms, search on Google
        return `https://www.google.com/search?q=${title}+streaming+${providerName}`;
    }
  };

  if (!info) return <Loading />;

  const noImagePlaceholder = "https://via.placeholder.com/500x750/6556CD/white?text=No+Image+Available";
  const noBackdropPlaceholder = "https://via.placeholder.com/1920x1080/1F1E24/6556CD?text=No+Image+Available";

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${
          info.details?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${info.details.backdrop_path}`
            : noBackdropPlaceholder
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen relative h-screen overflow-y-auto px-[8%]"
    >
      {/* Navigation */}
      <nav className="w-full h-[7vh] flex items-center gap-6 text-base text-zinc-300 bg-black/20 rounded-md shadow px-4 mt-3 mb-3">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line text-xl hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
        ></Link>

        {info.details?.homepage && (
          <a
            target="_blank"
            rel="noreferrer"
            href={info.details.homepage}
            className="hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
          >
            <i className="ri-external-link-fill hover:text-[#6556CD] text-xl"></i>
          </a>
        )}
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://en.wikipedia.org/wiki/${info.details?.original_name || info.details?.name}`}
          className="hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
        >
          <i className="ri-earth-fill hover:text-[#6556CD] text-xl"></i>
        </a>
        {info.externalid?.imdb_id && (
          <a
            className="hover:text-[#6556CD] font-semibold hover:scale-105 transition-all duration-300 px-3 py-2 hover:bg-white/10 rounded-lg"
            target="_blank"
            rel="noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            IMDb
          </a>
        )}
      </nav>

      {/* Poster + Content */}
      <div className="w-full flex mt-3">
        <img
          className="shadow-xl hover:shadow-[8px_17px_50px_8px_rgba(101,86,205,0.4)] h-[40vh] object-cover rounded-xl transition-all duration-500 hover:scale-105 border border-white/20"
          src={
            info.details?.backdrop_path || info.details?.poster_path
              ? `https://image.tmdb.org/t/p/original/${info.details.backdrop_path || info.details.poster_path}`
              : noImagePlaceholder
          }
          alt={info.details?.name || info.details?.original_name || "TV Show"}
          onError={(e) => {
            e.target.src = noImagePlaceholder;
          }}
        />

        <div className="content ml-[5%]">
          <h1 className="text-5xl font-black text-zinc-100 drop-shadow-2xl">
            {info.details?.name || info.details?.original_name}
            <small className="text-lg text-zinc-300 font-normal ml-3 drop-shadow-lg">
              ({info.details?.first_air_date ? info.details.first_air_date.split("-")[0] : "N/A"})
            </small>
          </h1>

          <div className="flex text-zinc-100 items-center gap-4 mt-3 drop-shadow-lg text-sm">
            <span className="text-black flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 w-[6vh] h-[6vh] rounded-full text-sm font-bold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110">
              {info.details?.vote_average ? (info.details.vote_average * 10).toFixed() : "0"}
              <sup className="text-xs">%</sup>
            </span>
            <h1 className="font-medium">User Score</h1>
            <span className="text-zinc-400">•</span>
            <h1 className="text-zinc-200 font-medium">{info.details?.first_air_date}</h1>
            <span className="text-zinc-400">•</span>
            <h1 className="text-zinc-200 font-medium">
              {info.details?.genres?.length
                ? info.details.genres.map((g) => g.name).join(", ")
                : "N/A"}
            </h1>
            <span className="text-zinc-400">•</span>
            <h1 className="text-zinc-200 font-medium">
              {info.details?.number_of_seasons
                ? `${info.details.number_of_seasons} Season${info.details.number_of_seasons > 1 ? "s" : ""}`
                : "N/A"}
            </h1>
          </div>

          {info.details?.tagline && (
            <h1 className="text-xl font-semibold italic text-blue-200 mt-3 drop-shadow-lg">
              "{info.details.tagline}"
            </h1>
          )}

          <h1 className="text-xl mt-3 text-zinc-100 font-bold drop-shadow-lg">Overview</h1>
          <p className="text-zinc-200 text-sm leading-relaxed drop-shadow-md">
            {info.details?.overview || "No overview available."}
          </p>

          <h1 className="text-xl mt-5 text-zinc-100 font-bold drop-shadow-lg">Available In</h1>
          <p className="text-zinc-200 text-sm leading-relaxed drop-shadow-md">
            {info.translations?.length ? info.translations.join(", ") : "N/A"}
          </p>

          {/* Trailer Section */}
          {info.videos?.key && (
            <div className="mt-8" id="trailer-section">
              <h1 className="text-2xl text-zinc-100 font-bold mb-4 drop-shadow-lg flex items-center">
                <i className="ri-play-circle-line text-[#6556CD] mr-3"></i>
                Watch Trailer
              </h1>
              <div className="relative w-full max-w-4xl">
                <iframe
                  className="w-full h-[400px] rounded-xl shadow-2xl border border-white/20"
                  src={`https://www.youtube.com/embed/${info.videos.key}?rel=0&modestbranding=1`}
                  title="TV Show Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Trailer Button */}
          <div className="flex gap-4 mt-4">
            {info.videos?.key ? (
              <a
                href="#trailer-section"
                className="bg-gradient-to-r from-[#6556CD] to-[#8B5FBF] hover:from-[#7B6BD9] hover:to-[#9D71D1] text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
              >
                <i className="ri-play-fill text-xl"></i>
                Watch Trailer ({info.videos.type})
              </a>
            ) : (
              <div className="bg-gray-600 text-gray-300 font-bold py-3 px-6 rounded-xl shadow-xl flex items-center gap-2 cursor-not-allowed opacity-50">
                <i className="ri-play-fill text-xl"></i>
                No Trailer Available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Watch Providers Section */}
      <div className="w-full mt-5">
        <div className="mb-3">
          <p className="text-zinc-400 text-sm italic">💡 Click on any platform logo to go directly to that streaming service</p>
        </div>
        
        {["buy", "flatrate", "ads"].map(
          (type) =>
            info.watchproviders?.[type]?.length > 0 && (
              <div key={type} className="flex items-center gap-4 flex-wrap mb-4">
                <h1 className="text-xl text-zinc-100 font-bold mr-4 drop-shadow-lg mb-2">
                  Available{" "}
                  {type === "buy"
                    ? "to Rent"
                    : type === "flatrate"
                    ? "to Stream"
                    : "with Ads"}
                </h1>
                {info.watchproviders[type].map((w, index) => (
                  <a
                    key={index}
                    href={getStreamingPlatformUrl(w.provider_name, info.details?.name || info.details?.original_name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${type === "buy" ? "Rent" : type === "flatrate" ? "Stream" : "Watch"} ${info.details?.name || info.details?.original_name} on ${w.provider_name}`}
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <img
                      className="w-[6vh] h-[6vh] object-cover rounded-lg mr-3 shadow hover:shadow-xl hover:shadow-[#6556CD]/50 transition-all duration-300 border border-white/20 cursor-pointer"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt={`${w.provider_name} logo`}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60x60/6556CD/white?text=N/A";
                      }}
                    />
                  </a>
                ))}
              </div>
            )
        )}
      </div>

      {/* Cast Section */}
      {info.credits?.cast?.length > 0 && (
        <div className="w-full mt-5">
          <h1 className="text-2xl text-zinc-100 font-bold mb-4 drop-shadow-lg">Cast</h1>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {info.credits.cast.slice(0, 10).map((actor, index) => (
              <div key={index} className="min-w-[120px] text-center">
                <img
                  className="w-[80px] h-[80px] object-cover rounded-full mx-auto mb-2 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 border border-white/20"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/80x80/6556CD/white?text=N/A"
                  }
                  alt={actor.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80x80/6556CD/white?text=N/A";
                  }}
                />
                <p className="text-xs text-zinc-200 font-medium">{actor.name}</p>
                <p className="text-xs text-zinc-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <hr className="border-zinc-600 mt-6 mb-6 shadow-lg" />
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-100 font-bold mb-4 drop-shadow-lg">
          {info.recommendations?.length > 0 ? "Recommended for You" : "Similar TV Shows"}
        </h1>
        <HorizontalCards
          data={
            info.recommendations?.length > 0 ? info.recommendations : info.similar || []
          }
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Tvdetails;