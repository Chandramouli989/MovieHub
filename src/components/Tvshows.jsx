import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/Axios';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Tvshows = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tvshows, setTvshows] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Chandra Mouli Patle | TV " + category.toUpperCase();

    const GetTvshows = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            // console.log("data: ", data);
            if (data.results.length > 0) {
                setTvshows((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const refreshHandler = () => {
        if (tvshows.length === 0) {
            GetTvshows();
        } else {
            setPage(1);
            setTvshows([]);
            GetTvshows();
        }
        // console.log(tvshows);
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return tvshows.length > 0 ? (
        <div className='w-full h-screen bg-gradient-to-br from-[#1f1e24] via-[#252229] to-[#1f1e24]'>
            <div className='px-[3%] w-full flex items-center justify-between mb-5 pt-4 relative z-50'>
                <h1 className='text-2xl text-zinc-300 font-semibold flex items-center'>
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-3xl hover:text-[#6556CD] text-zinc-400 cursor-pointer transition-colors duration-300 mr-3"></i>
                    <span className="bg-gradient-to-r from-[#d7d6dd] to-[#ccc9d2] bg-clip-text text-transparent"><i className="ri-tv-line mr-2 text-[#6556CD]"></i>TV Show's({category})</span>
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <div className="hover:scale-105 transition-transform duration-200 relative z-50">
                        <Dropdown
                            title="Category"
                            options={["popular", "top_rated", "on_the_air", "airing_today"]}
                            func={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className='w-[2%]'></div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={tvshows.length}
                next={GetTvshows}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center py-6">
                        <div className="flex items-center gap-2 text-zinc-300">
                            <div className="w-5 h-5 border-2 border-[#6556CD] border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                        </div>
                    </div>
                }
            >
                <Cards data={tvshows} category={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Tvshows;