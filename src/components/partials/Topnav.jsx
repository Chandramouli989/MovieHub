import React, { useEffect, useState } from 'react'
import axios from "../../utils/Axios";
import { Link } from 'react-router-dom';
import noimage from "/noimage.jpeg";

const Topnav = () => {
    const [query, setquery] = useState("");
    const [searches, setsearches] = useState([])
    
    const GetSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            console.log("Search API response:", data);  
            console.log("Search results:", data.results);
            setsearches(data.results);
        } catch (error) {
            console.log("Search error:", error);
        }
    }
 
    useEffect(() => {
        if (query.length > 0) {
            GetSearches();
        } else {
            setsearches([]);
        }
    }, [query]);

    // Function to determine the correct route based on media type
    const getRouteForMedia = (item) => {
        console.log("Processing search item:", item);
        console.log("Media type:", item.media_type);
        console.log("ID:", item.id);
        
        if (item.media_type === 'movie') {
            const route = `/movie/details/${item.id}`;
            console.log("Generated movie route:", route);
            return route;
        } else if (item.media_type === 'tv') {
            const route = `/tv/details/${item.id}`;
            console.log("Generated TV route:", route);
            return route;
        } else if (item.media_type === 'person') {
            const route = `/person/details/${item.id}`;
            console.log("Generated person route:", route);
            return route;
        }
        // Default fallback
        const defaultRoute = `/movie/details/${item.id}`;
        console.log("Generated default route:", defaultRoute);
        return defaultRoute;
    };

    return (
        <div className='w-[80%] h-[10vh] relative flex mx-auto items-center'>
            <i className="text-zinc-400 text-2xl ri-search-2-line"></i>
            <input
                onChange={(e) => setquery(e.target.value)}
                value={query}
                className='w-[50%] rounded-full mx-10 p-5 text-xl outline-none border-none'
                type="text"
                placeholder='search anything' />
            {query.length > 0 && (
                <i
                    onClick={() => setquery("")}
                    className="text-2xl text-zinc-400 ri-close-line cursor-pointer"></i>
            )}
            
            <div className='w-[55%] max-h-[50vh] bg-zinc-800 top-[100%] absolute left-[5%] z-[100] overflow-auto'>
                {query.length > 0 && searches.map((s, i) => (
                    <Link
                        key={i}
                        to={getRouteForMedia(s)}
                        onClick={() => setquery("")}
                        className='font-semibold hover:text-black bg-zinc:hover text-zinc-400 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-700'>
                        <img 
                            className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg'
                            src={
                                s.backdrop_path || s.profile_path 
                                    ? `http://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` 
                                    : noimage
                            } 
                            alt="" 
                        />
                        <span className='text-white'>{s.original_title || s.title || s.original_name || s.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Topnav