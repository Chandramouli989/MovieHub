import axios from "axios";

const instance = axios.create({
  baseURL: "/api/tmdb",
  timeout: 30000,
  headers: {
    accept: "application/json",
  },
});

export default instance;