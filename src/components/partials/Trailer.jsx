import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Trailer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info: movieInfo } = useSelector((state) => state.movie);
  const { info: tvInfo } = useSelector((state) => state.tv);
  const { info: personInfo } = useSelector((state) => state.person);

  // Determine which info to use based on current route
  const info = movieInfo || tvInfo || personInfo;
  const videoKey = info?.videos?.key;

  if (!videoKey) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl mb-4">No Trailer Available</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#6556CD] hover:bg-[#7B6BD9] px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const trailerUrl = `https://www.youtube.com/watch?v=${videoKey}`;

  return (
    <div className="w-screen h-screen bg-black relative">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 z-50 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-colors duration-300"
      >
        <i className="ri-close-line text-2xl"></i>
      </button>

      {/* Trailer */}
      <div className="w-full h-full flex items-center justify-center">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
