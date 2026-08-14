export default async function handler(request, response) {
    try {
      const path = request.query.path;
  
      if (!path) {
        return response.status(400).json({
          error: "TMDB API path is required",
        });
      }
  
      const tmdbUrl = `https://api.themoviedb.org/3/${path}`;
  
      const tmdbResponse = await fetch(tmdbUrl, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      });
  
      const data = await tmdbResponse.json();
  
      return response.status(tmdbResponse.status).json(data);
    } catch (error) {
      console.error(error);
  
      return response.status(500).json({
        error: "Failed to fetch data from TMDB",
      });
    }
  }