import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Trending from "./components/Trending"
import Movie from "./components/Movie"
import Popular from "./components/Popular"
import Tvshows from "./components/Tvshows"
import Celebs from "./components/Celebs"
import Moviedetails from "./components/Moviedetails"
import Tvdetails from "./components/Tvdetails"
import Persondetails from "./components/Persondetails"
import Trailer from "./components/partials/Trailer"
import About from "./components/About"
import Contact from "./components/Contact"

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] ">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<Tvdetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/celebs" element={<Celebs />} />
        <Route path="/person/details/:id" element={<Persondetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </div>
  )
}

export default App