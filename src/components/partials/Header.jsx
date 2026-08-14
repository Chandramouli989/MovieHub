import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Header = ({data}) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    
    if (!data || Object.keys(data).length === 0) {
        return null;
    }
    
    // Determine media type based on available properties
    const getMediaType = (item) => {
        // If media_type is explicitly provided, use it
        if (item.media_type) {
            return item.media_type;
        }
        
        // Determine type based on available properties
        if (item.profile_path && item.known_for_department) {
            return 'person';
        }
        if (item.title && item.release_date) {
            return 'movie';
        }
        if (item.name && item.first_air_date) {
            return 'tv';
        }
        
        // Default fallback
        return 'movie';
    };
    
    const mediaType = getMediaType(data);
    
    return (
        <div style={{
            background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat:"no-repeat"
           
        }} className='w-full h-[52vh] flex flex-col justify-end items-start p-[5%]'>
            <h1 className='w-[70%] text-5xl font-black text-white'>
                {data.original_title || data.title || data.original_name || data.name}
            </h1>
            <p className='w-[70%] mt-3 text-white'>
                {data.overview ? data.overview.slice(0,200) + '...' : 'No overview available'}
                <Link to={`/${mediaType}/details/${data.id}`} className='text-blue-400 ml-2'>more</Link> 
            </p>
            <p className='text-white mt-2 mb-5'>
                <i className="text-yellow-500 ri-megaphone-line"></i> {data.release_date || data.first_air_date || "No Info"}
                <i className="ml-5 text-yellow-500 ri-album-fill"></i> {mediaType.toUpperCase()}
            </p>
            {isHomePage ? (
                // On home page, navigate to detail page with trailer
                <Link 
                    to={`/${mediaType}/details/${data.id}`}
                    className='p-4 font-medium bg-[#6556CD] hover:bg-[#7B6BD9] rounded text-white transition-colors duration-300 text-center'
                > 
                    <i className="ri-play-fill mr-2"></i>
                    Watch Trailer
                </Link>
            ) : (
                // On detail page, scroll to trailer section
                data.videos?.key ? (
                    <div className="flex flex-col gap-3">
                        <a 
                            href="#trailer-section"
                            className='p-4 font-medium bg-[#6556CD] hover:bg-[#7B6BD9] rounded text-white transition-colors duration-300 text-center'
                        > 
                            <i className="ri-play-fill mr-2"></i>
                            Watch Trailer
                        </a>
                        <p className="text-zinc-300 text-sm text-center">
                            <i className="ri-arrow-down-line mr-1"></i>
                            Trailer available below
                        </p>
                    </div>
                ) : (
                    <div className="p-4 font-medium bg-gray-600 rounded text-gray-300 cursor-not-allowed opacity-50">
                        <i className="ri-play-fill mr-2"></i>
                        No Trailer Available
                    </div>
                )
            )}
        </div>
    )
}

export default Header