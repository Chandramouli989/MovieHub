import axios from "../../utils/Axios";
import { loadtv, removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch) => {
  try {
    const [detail, externalid, videos, watchproviders, recommendations, similar, translations, credits] = await Promise.all([
      axios.get(`/tv/${id}`),
      axios.get(`/tv/${id}/external_ids`),
      axios.get(`/tv/${id}/videos`),
      axios.get(`/tv/${id}/watch/providers`),
      axios.get(`/tv/${id}/recommendations`),
      axios.get(`/tv/${id}/similar`),
      axios.get(`/tv/${id}/translations`),
      axios.get(`/tv/${id}/credits`),
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
      watchproviders: watchproviders.data.results?.US || {},
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t => t.english_name),
      credits: credits.data,
    };

    dispatch(loadtv(aggregated));
  } catch (error) {
    console.error("Failed to load TV details:", error?.message || error);
  }
};

export { removetv } from "../reducers/tvSlice";
