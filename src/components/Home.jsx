import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from "../utils/Axios";
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import Loading from './partials/Loading';

const Home = () => {
  document.title ="MovieHub | Homepage"
  
  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)

  const GetHeaderWallpaper= async ()=>{
    try{
        const {data}= await axios.get(`/trending/all/day`);  
        let randomdata = data.results[(Math.random()*data.results.length).toFixed()];
        
        // Fetch video data for the selected item
        if (randomdata.media_type && randomdata.id) {
          try {
            const videoResponse = await axios.get(`/${randomdata.media_type}/${randomdata.id}/videos`);
            if (videoResponse.data.results && videoResponse.data.results.length > 0) {
              // Find the first trailer
              const trailer = videoResponse.data.results.find(video => 
                video.type === 'Trailer' || video.type === 'trailer'
              );
              if (trailer) {
                randomdata.videos = { key: trailer.key, type: trailer.type };
              }
            }
          } catch (videoError) {
            console.log("Video fetch error:", videoError);
          }
        }
        
        setwallpaper(randomdata);
    } catch (error){
        console.log("Error:",error);
    }
}

const GetTrending = async ()=>{
  try{
      const {data}= await axios.get(`/trending/all/day`);  
      
      settrending(data.results);

  } catch (error){
      console.log("Error:",error);
      
  }
}

useEffect(()=>{
     !wallpaper && GetHeaderWallpaper();
     !trending && GetTrending();
},[]);
console.log(trending);

  return wallpaper && trending ?  (
    <div className="flex h-full ">
        <Sidenav />
        <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
            <Topnav />
            <Header  data={wallpaper}/>
            <HorizontalCards data={trending} />
        </div>
    </div>
  ): <Loading />
}

export default Home