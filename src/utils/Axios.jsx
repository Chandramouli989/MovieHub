import axios from "axios";

// Simple axios instance for TMDB API
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 30000, // 30 second timeout for slow networks
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWRmMmEwNGZkYjRjYjFlOWExMjliZjkyNzE0MThlZiIsIm5iZiI6MTc0ODA3MTE0OC4wMDYsInN1YiI6IjY4MzE3MmVjMDg4OWQzYjRiNzQxMzhiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L-AQEQTG3UqmmNG4Ga2KC4ANoInHeQaAmQzXjbmyAnM'
  }
});

export default instance;