import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

const HorizontalCards = ({ data, title = "Trending" }) => {
  // Simple state management
  const [filteredData, setFilteredData] = useState(data)
  const [selectedFilter, setSelectedFilter] = useState('All')
  
  // Update when data changes
  useEffect(() => {
    setFilteredData(data)
  }, [data])
  
  // Simple filter options
  const filterOptions = ['All', 'Movies', 'TV Shows']
  
  // Clean filter logic
  const handleFilterChange = (e) => {
    const filter = e.target.value
    setSelectedFilter(filter)
    
    let filtered = [...data]
    
    switch(filter) {
      case 'Movies':
        filtered = data.filter(item => 
          item.media_type === 'movie' || 
          (item.title && !item.name)
        )
        break
      case 'TV Shows':
        filtered = data.filter(item => 
          item.media_type === 'tv' || 
          (item.name && !item.title)
        )
        break
      default:
        filtered = data
    }
    
    setFilteredData(filtered)
  }

      return (
    <div className='w-full'>
      {/* Header with Filter */}
      <div className='flex items-center justify-between mb-4 p-4'>
        <h1 className='text-2xl font-bold text-white'>{title}</h1>
        <Dropdown 
          title="Filter" 
          options={filterOptions} 
          func={handleFilterChange}
        />
      </div>
      
      {/* Cards Container - Simple like original */}
      <div className='w-full h-[40vh] flex overflow-y-hidden mb-5 p-5'>
        {filteredData.length > 0 ? (
          filteredData.map((d, i) => {
            // Determine media type for navigation
            const mediaType = d.media_type || (d.title ? 'movie' : d.name ? 'tv' : 'movie');
            
            return (
              <Link 
                to={`/${mediaType}/details/${d.id}`} 
                key={i} 
                className='min-w-[15%] h-full mr-5 bg-zinc-900 mb-5 rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#875fc1] hover:scale-105 transition-all duration-300'
              >
                <img 
                  className='w-full h-[60%] object-cover' 
                  src={`https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.poster_path || ""
                  }`}
                  alt=""
                />

                <div className='text-white p-3 flex-1 flex flex-col justify-between'>
                  <h1 className='text-sm font-semibold leading-tight line-clamp-2 mb-2'>
                    {d.name ||
                      d.title ||
                      d.original_name ||
                      d.original_title ||
                      "Untitled"}
                  </h1>

                  <p className='text-xs text-zinc-300 leading-relaxed line-clamp-3'>
                    {(d.overview || "").slice(0, 80)}...
                    <span className='text-zinc-400 hover:text-white cursor-pointer'> more</span>
                  </p>
                </div>
              </Link> 
            );
          })
        ) : (
          <div className='w-full flex items-center justify-center'>
            <h1 className='text-white text-3xl mt-6 text-center'>
              No {selectedFilter !== 'All' ? selectedFilter : 'items'} found
            </h1>
          </div>
        )}
      </div>
    </div>
  )
 }

export default HorizontalCards