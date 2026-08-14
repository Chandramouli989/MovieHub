import axios from '../utils/Axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'
import Loading from './partials/Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("all")
  const [Duration, setduration] = useState("day")
  const [trending, settrending] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "Chandra Mouli Patle | Trending " + Category



  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/${Duration}?page=${page}`);


      if (data.results.length > 0) {
        settrending((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1)
      }
      else {
        sethasMore(false);
      }

    } catch (error) {
      console.log("Error:", error);

    }
  }

  const refreshHandler =  () => {
    if (trending.length === 0) {
      GetTrending()
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  }




  useEffect(() => {
    refreshHandler();

  }, [Category, Duration])

  return trending.length > 0 ? (
    <div className='px-[2%] min-w-full min-h-screen bg-[#1f1e24]'>

      <div className=' w-full  flex items-center  justify-between'>

        <h1 className='  text-2xl font-semibold text-zinc-400 '>


          <i onClick={() => navigate(-1)}


            className=" hover:text-[#6556CD] mr-3 ri-arrow-left-line"></i>


          <i className=" mr-1 text-[#6556CD] ri-fire-fill"></i>


          Trending</h1>

        <div className='flex items-center w-[75%]  '>
          <Topnav />

          <Dropdown
            title='Category'
            options={["movie", 'tv', "all"]}
            func={(e) => setCategory(e.target.value)} />

          <div className='w-[2%]'></div>

          <Dropdown
            title='Duration'
            options={["week", 'day']}
            func={(e) => setduration(e.target.value)} />
        </div>
      </div>


      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading..</h1>}
      >

        <Cards data={trending} title={Category} />
      </InfiniteScroll>

    </div>
  ) : <Loading />
}

export default Trending