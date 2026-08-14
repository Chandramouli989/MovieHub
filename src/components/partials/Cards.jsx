import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, category, title }) => {
  // Determine the correct route based on item type and category/title
  const getItemRoute = (item) => {
    // Use category if available, otherwise fall back to title
    const itemCategory = category || title;
    
    // If it's a person (has profile_path and known_for_department)
    if (item.profile_path && item.known_for_department) {
      return `/person/details/${item.id}`;
    }
    
    // If category is explicitly "person" or "celebs"
    if (itemCategory === "person" || itemCategory === "celebs") {
      return `/person/details/${item.id}`;
    }
    
    // If it's a movie (has title and release_date)
    if (item.title && item.release_date) {
      return `/movie/details/${item.id}`;
    }
    
    // If it's a TV show (has name and first_air_date)
    if (item.name && item.first_air_date) {
      return `/tv/details/${item.id}`;
    }
    
    // Default fallback - try to determine from media_type if available
    if (item.media_type === "movie") {
      return `/movie/details/${item.id}`;
    }
    if (item.media_type === "tv") {
      return `/tv/details/${item.id}`;
    }
    if (item.media_type === "person") {
      return `/person/details/${item.id}`;
    }
    
    // Last resort - assume based on category/title
    if (itemCategory === "movie") {
      return `/movie/details/${item.id}`;
    }
    if (itemCategory === "tv" || itemCategory === "tvshows") {
      return `/tv/details/${item.id}`;
    }
    if (itemCategory === "person" || itemCategory === "celebs") {
      return `/person/details/${item.id}`;
    }
    
    // Default to movie if we can't determine
    return `/movie/details/${item.id}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-[5%] bg-[#1f1e24] min-h-screen w-full">
      {data.map((c, i) => (
        <Link
          className="relative w-[28vh] mb-[5%] hover:scale-105 transition-transform duration-300"
          key={i}
          to={getItemRoute(c)}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] hover:shadow-[8px_17px_38px_2px_rgba(101,86,205,0.3)] h-[40vh] items-center justify-center object-cover rounded-lg transition-shadow duration-300"
            src={`https://image.tmdb.org/t/p/original/${c.backdrop_path || c.poster_path || c.profile_path}`}
            alt=""
          />
          <div className="text-2xl text-zinc-400 hover:text-[#6556CD] font-semibold mt-3 transition-colors duration-300 text-center">
            {c.original_title || c.title || c.original_name || c.name}
          </div>

          <div className="flex justify-center items-center mt-2">
            {typeof c.vote_average === "number" && !isNaN(c.vote_average) && (
              <span className="flex items-center text-yellow-400 font-semibold text-base">
                <i className="ri-star-fill mr-1"></i>
                {c.vote_average.toFixed(1)}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;