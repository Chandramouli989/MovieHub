import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
    const navigate = useNavigate();
    const [Category, setCategory] = useState("movie")
    const [popular, setpopular] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "Chandra Mouli Patle | Popular " + Category.toUpperCase()



    const Getpopular = async () => {
        try {
            const { data } = await axios.get(`/${Category}/popular?page=${page}`);
            console.log("Popular API data:", data); // Debug log


            if (data.results.length > 0) {
                setpopular((prevstate) => [...prevstate, ...data.results]);
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
        if (popular.length === 0) {
            Getpopular()
        } else {
            setpage(1);
            setpopular([]);
            Getpopular();
        }
    }




    useEffect(() => {
        refreshHandler();

    }, [Category])

    return popular.length > 0 ? (
        <div className='px-[2%] min-w-full min-h-screen bg-[#1f1e24]'>

            <div className=' w-full  flex items-center  justify-between'>

                <h1 className='  text-2xl font-semibold text-zinc-400 '>
                    <i onClick={() => navigate(-1)}
                        className=" hover:text-[#6556CD] mr-3 ri-arrow-left-line"></i>
                    <i className=" mr-1 text-[#6556CD] ri-star-fill"></i>
                    Popular
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
                        options={["week", 'day']}
                        func={(e) => setduration(e.target.value)} />
                    <div className='w-[2%]'></div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={popular.length}
                next={Getpopular}
                hasMore={hasMore}
                loader={<h1>Loading..</h1>}
            >
                <Cards data={popular} title={Category} />
            </InfiniteScroll>
        </div>
    ) : <Loading />
}

export default Popular