import axios from "../../utils/Axios";
import { loadperson } from "../reducers/personSlice";

// Re-export cleanup action for convenience where needed
export { removeperson } from "../reducers/personSlice";

// Fetch a person's full profile and credits from TMDB
export const asyncloadperson = (id) => async (dispatch) => {
  try {
    const [detail, externalid, combinedCredits, tvCredits, movieCredits] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
      axios.get(`/person/${id}/tv_credits`),
      axios.get(`/person/${id}/movie_credits`),
    ]);

    const aggregated = {
      details: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };

    dispatch(loadperson(aggregated));
  } catch (error) {
    // Surface minimal error info for debugging without breaking UI
    // eslint-disable-next-line no-console
    console.error("Failed to load person details:", error?.message || error);
  }
};


