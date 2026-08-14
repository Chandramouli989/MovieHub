import axios from "../../utils/Axios";
import { loadmovie, removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch) => {
  try {
    const [detail, externalid, videos, watchproviders, recommendations, similar, translations] = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/external_ids`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/watch/providers`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/translations`),
    ]);

    // Find the trailer video
    let trailerVideo = null;
    if (videos.data.results && videos.data.results.length > 0) {
      // Look for official trailer first, then any trailer
      trailerVideo = videos.data.results.find(video => 
        video.type === 'Trailer' && video.official === true
      ) || videos.data.results.find(video => 
        video.type === 'Trailer'
      ) || videos.data.results.find(video => 
        video.type === 'trailer'
      );
    }

    const aggregated = {
      details: detail.data,
      externalid: externalid.data,
      videos: trailerVideo || null,
      watchproviders: watchproviders.data.results?.IN || {},
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t => t.english_name),
    };

    dispatch(loadmovie(aggregated));
  } catch (error) {
    console.error("Failed to load movie details:", error?.message || error);
  }
};

export { removemovie } from "../reducers/movieSlice";
