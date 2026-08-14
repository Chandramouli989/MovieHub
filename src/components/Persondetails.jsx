import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";
import { asyncloadperson, removeperson } from "../Store/actions/personActions";

const Persondetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id, pathname]);

  if (!info) return <Loading />;

  const profileUrl = info.details?.profile_path
    ? `https://image.tmdb.org/t/p/original/${info.details.profile_path}`
    : "";

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${profileUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen relative h-screen overflow-y-auto px-[8%]"
    >
      {/* Top bar */}
      <nav className="w-full h-[7vh] flex items-center gap-4 text-sm text-zinc-300 bg-black/25 rounded-md shadow px-4 mt-3 mb-3">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line text-xl hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
        ></Link>
        {info.externalid?.instagram_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://instagram.com/${info.externalid.instagram_id}`}
            className="hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
          >
            <i className="ri-instagram-fill hover:text-[#6556CD] text-xl"></i>
          </a>
        )}
        {info.externalid?.twitter_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/${info.externalid.twitter_id}`}
            className="hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
          >
            <i className="ri-twitter-fill hover:text-[#6556CD] text-xl"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a
            className="hover:text-[#6556CD] font-semibold hover:scale-105 transition-all duration-300 px-3 py-2 hover:bg-white/10 rounded-lg"
            target="_blank"
            rel="noreferrer"
            href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
          >
            IMDb
          </a>
        )}
      </nav>

      {/* Profile header */}
      <div className="w-full flex mt-3">
        <img
          className="shadow-xl hover:shadow-[8px_17px_50px_8px_rgba(101,86,205,0.4)] h-[40vh] object-cover rounded-xl transition-all duration-500 hover:scale-105 border border-white/20"
          src={profileUrl || "/noimage.jpeg"}
          alt=""
        />

        <div className="content ml-[5%]">
          <h1 className="text-5xl font-black text-zinc-100 drop-shadow-2xl">
            {info.details?.name}
            <small className="text-lg text-zinc-300 font-normal ml-3 drop-shadow-lg">
              ({info.details?.birthday ? new Date(info.details.birthday).getFullYear() : "N/A"})
            </small>
          </h1>

          <div className="flex text-zinc-100 items-center gap-4 mt-3 drop-shadow-lg text-sm">
            <span className="text-black flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 w-[6vh] h-[6vh] rounded-full text-sm font-bold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110">
              {info.details?.popularity ? Number(info.details.popularity).toFixed() : "0"}
            </span>
            <h1 className="font-medium">Popularity</h1>
            <span className="text-zinc-400">•</span>
            <h1 className="text-zinc-200 font-medium">{info.details?.known_for_department}</h1>
            <span className="text-zinc-400">•</span>
            <h1 className="text-zinc-200 font-medium">{info.details?.place_of_birth}</h1>
          </div>

          <h1 className="text-xl mt-5 text-zinc-100 font-bold drop-shadow-lg">Biography</h1>
          <p className="text-zinc-200 text-sm leading-relaxed drop-shadow-md">
            {info.details?.biography ? `${info.details.biography.substring(0, 300)}...` : "No biography available"}
          </p>

          {Array.isArray(info.details?.also_known_as) && info.details.also_known_as.length > 0 && (
            <>
              <h1 className="text-xl mt-5 text-zinc-100 font-bold drop-shadow-lg">Also Known As</h1>
              <p className="text-zinc-200 text-sm leading-relaxed drop-shadow-md">
                {info.details.also_known_as.slice(0, 3).join(", ")}
              </p>
            </>
          )}

          {/* Personal Details */}
          <div className="mt-6 space-y-3">
            {info.details?.birthday && (
              <div className="flex items-center gap-3">
                <i className="ri-calendar-line text-[#6556CD]"></i>
                <span className="text-zinc-300 text-sm">
                  <span className="text-zinc-400">Born:</span> {new Date(info.details.birthday).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            )}
            
            {info.details?.deathday && (
              <div className="flex items-center gap-3">
                <i className="ri-heart-line text-red-500"></i>
                <span className="text-zinc-300 text-sm">
                  <span className="text-zinc-400">Died:</span> {new Date(info.details.deathday).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            )}
            
            {info.details?.place_of_birth && (
              <div className="flex items-center gap-3">
                <i className="ri-map-pin-line text-[#6556CD]"></i>
                <span className="text-zinc-300 text-sm">
                  <span className="text-zinc-400">From:</span> {info.details.place_of_birth}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Known For */}
      <hr className="border-zinc-600 mt-6 mb-6 shadow-lg" />
      
      {/* Career Statistics */}
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-100 font-bold mb-6 drop-shadow-lg flex items-center">
          <i className="ri-bar-chart-line text-[#6556CD] mr-3"></i>
          Career Overview
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700 text-center">
            <div className="text-2xl font-bold text-[#6556CD] mb-1">
              {info.movieCredits?.cast?.length || 0}
            </div>
            <div className="text-zinc-400 text-sm">Movies</div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700 text-center">
            <div className="text-2xl font-bold text-[#6556CD] mb-1">
              {info.tvCredits?.cast?.length || 0}
            </div>
            <div className="text-zinc-400 text-sm">TV Shows</div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700 text-center">
            <div className="text-2xl font-bold text-[#6556CD] mb-1">
              {info.combinedCredits?.cast?.length || 0}
            </div>
            <div className="text-zinc-400 text-sm">Total Roles</div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700 text-center">
            <div className="text-2xl font-bold text-[#6556CD] mb-1">
              {info.details?.popularity ? Number(info.details.popularity).toFixed() : '0'}
            </div>
            <div className="text-zinc-400 text-sm">Popularity</div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-zinc-100 font-bold drop-shadow-lg flex items-center">
            <i className="ri-star-fill text-yellow-500 mr-3"></i>
            Known For
          </h1>
          <span className="text-zinc-400 text-sm bg-zinc-800 px-3 py-1 rounded-full">
            Most Popular Work
          </span>
        </div>
        
        <div className="bg-zinc-900/20 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
          <HorizontalCards 
            data={info.combinedCredits?.cast ? info.combinedCredits.cast.slice(0, 10) : []} 
            title=""
          />
        </div>
      </div>

      {/* Work Sections - Movies and TV Shows */}
      <div className="space-y-8">
        {/* Movies Section */}
        {info.movieCredits?.cast && info.movieCredits.cast.length > 0 && (
          <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl text-zinc-100 font-bold drop-shadow-lg flex items-center">
                <i className="ri-film-fill text-[#6556CD] mr-3"></i>
                Movies
              </h1>
              <span className="text-zinc-400 text-sm bg-zinc-800 px-3 py-1 rounded-full">
                {info.movieCredits.cast.length} roles
              </span>
            </div>
            
            <HorizontalCards 
              data={info.movieCredits.cast.slice(0, 12)} 
              title=""
            />
            
            {info.movieCredits.cast.length > 12 && (
              <div className="text-center mt-4">
                <button className="text-[#6556CD] hover:text-[#7B6BD9] text-sm font-medium transition-colors duration-300">
                  View All {info.movieCredits.cast.length} Movies →
                </button>
              </div>
            )}
          </div>
        )}

        {/* TV Shows Section */}
        {info.tvCredits?.cast && info.tvCredits.cast.length > 0 && (
          <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl text-zinc-100 font-bold drop-shadow-lg flex items-center">
                <i className="ri-tv-line text-[#6556CD] mr-3"></i>
                TV Shows
              </h1>
              <span className="text-zinc-400 text-sm bg-zinc-800 px-3 py-1 rounded-full">
                {info.tvCredits.cast.length} roles
              </span>
            </div>
            
            <HorizontalCards 
              data={info.tvCredits.cast.slice(0, 12)} 
              title=""
            />
            
            {info.tvCredits.cast.length > 12 && (
              <div className="text-center mt-4">
                <button className="text-[#6556CD] hover:text-[#7B6BD9] text-sm font-medium transition-colors duration-300">
                  View All {info.tvCredits.cast.length} TV Shows →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Outlet />
    </div>
  );
};

export default Persondetails;