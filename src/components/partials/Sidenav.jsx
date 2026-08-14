import React from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {
    return (
        <div className='w-[20%] h-full border-r bg-[#1F1E24]  p-5 shadow-2xl overflow-auto  '>

                         <h1 className='text-2xl text-white '>
                                 <i className="ri-reactjs-line text-2xl text-[#4E3ECB] mr-1 "></i>
                <span className='text-2xl font-bold'>MovieHub</span>
            </h1>
                         <nav className="mt-10">
                 <h1 className='text-gray-300 font-semibold text-xl mb-6'>
                     New Feeds
                 </h1>
                 <div className="">
                     <Link to="/trending" className="flex mb-1 h-14 items-center text-gray-100 hover:text-white hover:bg-violet-600/50 px-3 py-2 rounded-lg transition-all duration-300 group">
                         <i className="ri-fire-line mr-3 text-lg group-hover:text-white"></i>
                         Trending
                     </Link>
                     <Link to="/popular" className="flex items-center mb-1 h-14 text-gray-100 hover:text-white hover:bg-violet-600/50 px-3 py-2 rounded-lg transition-all duration-300 group">
                          <i className="ri-star-line mr-3 text-lg group-hover:text-white"></i>
                          Popular
                      </Link>
                      
                      <Link to= "/movie" className="flex items-center mb-1 h-14 text-gray-100 hover:text-white hover:bg-violet-600/50 px-3 py-2 rounded-lg transition-all duration-300 group">
                          <i className="ri-film-fill mr-3 text-lg group-hover:text-white"></i>
                          Movies
                      </Link>
                      <Link to='/tvshows' className="flex items-center mb-1 h-14 text-gray-100 hover:text-white hover:bg-violet-600/50 px-3 py-2 rounded-lg transition-all duration-300 group">
                          <i className="ri-tv-line mr-3 text-lg group-hover:text-white"></i>
                          Tv Shows
                      </Link>
                      <Link to='/celebs' className="flex mb-3 h-14 items-center text-gray-100 hover:text-white hover:bg-violet-600/50 px-3 py-2 rounded-lg transition-all duration-300 group">
                          <i className="ri-group-line mr-3 text-lg group-hover:text-white"></i>
                          Celebs
                      </Link>
                 </div>
             </nav>
             <hr /> 
             <nav className="mt-10">
                 <h1 className='text-gray-300 font-semibold text-xl mb-6'>
                   Website Info.
                 </h1>
                 <div className="space-y-3">
                     <Link to="/about" className="flex mb-1 h-14 items-center text-gray-100 hover:text-white hover:bg-violet-600/50 px-3 py-2 rounded-lg transition-all duration-300 group">
                         <i className="ri-info-i mr-3 text-lg group-hover:text-white"></i>
                         About
                     </Link>
                     <Link to="/contact" className="flex items-center mb-1 h-14 text-gray-100 hover:text-white hover:bg-violet-600/50 px-3 py-2 rounded-lg transition-all duration-300 group">
                          <i className="ri-phone-line mr-3 text-lg group-hover:text-white"></i>
                          Contact
                      </Link>
                      
                     
                 </div>
             </nav>
        </div>

    )
}

export default Sidenav