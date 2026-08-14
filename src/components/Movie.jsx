import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = () => {
    const navigate = useNavigate();
    const [Category, setCategory] = useState("movie")
    const [movies, setmovies] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    const [Duration, setduration] = useState("popular")
    document.title = "Chandra Mouli Patle |  " + Category.toUpperCase().replace('POPULAR', 'MOVIE')



    const Getmovies = async () => {
        try {
            const { data } = await axios.get(`/${Category}/${Duration}?page=${page}`);
            console.log("Movie API data:", data); // Debug log


            if (data.results.length > 0) {
                setmovies((prevstate) => [...prevstate, ...data.results]);
                setpage(page + 1)
            }
            else {
                sethasMore(false);
            }

        } catch (error) {
            console.log("Error:", error);

        }
    }

    const refreshHandler = () => {
        if (movies.length === 0) {
            Getmovies()
        } else {
            setpage(1);
            setmovies([]);
            Getmovies();
        }
    }




    useEffect(() => {
        refreshHandler();

    }, [Category, Duration])
  return movies.length > 0 ? (
    <div className='px-[2%] min-w-full min-h-screen bg-[#1f1e24]'>

        <div className=' w-full  flex items-center  justify-between'>

            <h1 className='  text-2xl font-semibold text-zinc-400 '>
                <i onClick={() => navigate(-1)}
                    className=" hover:text-[#6556CD] mr-3 ri-arrow-left-line"></i>
                <i className=" mr-1 text-[#6556CD] ri-film-fill"></i>
                Movie
            </h1>
            <div className='flex items-center w-[75%]  '>
                <Topnav />
                <Dropdown
                    title='Category'
                    options={['tv',"movie" ]}
                    func={(e) => setCategory(e.target.value)} />
                <div className='mx-2'></div>
                <Dropdown
                    title='Duration'
                    options={["popular", 'top_rated',"upcoming","now_playing"]}
                    func={(e) => setduration(e.target.value)} />
                <div className='w-[2%]'></div>
            </div>
        </div>
        <InfiniteScroll
            dataLength={movies.length}
            next={Getmovies}
            hasMore={hasMore}
            loader={<h1>Loading..</h1>}
        >
            <Cards data={movies} category={Category} />
        </InfiniteScroll>
    </div>
) : <Loading />
}

export default Movie