import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, tmdbApi } from '../config/config';
import ReactPaginate from 'react-paginate';
import { MovieCard } from '../components';
import useDebounce from '../hooks/useDebouncs';


const itemsPerPage = 20; // sl movie 1 trang
const MoviePage = () => {
    const [nextPage, setNextPage] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState("");
    const filterDebounce = useDebounce(filter);
    const [url, setUrl] = useState(tmdbApi.getMovieList("popular", nextPage));

    const handleFilterChange = e => setFilter(e.target.value);
    useEffect(() => {
        if (filterDebounce) {
            setUrl(tmdbApi.getMovieSearch(filterDebounce, nextPage));
        } else {
            setUrl(tmdbApi.getMovieList("popular", nextPage))
        }
    }, [filterDebounce, nextPage])
    const { data, isLoading } = useSWR(url, fetcher);
    const movies = data?.results || [];

    //paging
    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage))
    }, [data, itemOffset])
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };
    return (
        <div className='pb-10 page-container'>
            <div className='flex mb-10 w-[500px] mx-auto'>
                <div className='flex-1 h-[46px]'>
                    <input
                        name='search'
                        className='w-full h-full px-4 bg-slate-600 text-white outline-none rounded-tl-md rounded-bl-md'
                        placeholder='Enter the movie name'
                        onChange={handleFilterChange}
                    />
                </div>
                <button className='px-5 bg-primary text-white h-[46px] rounded-tr-md rounded-br-md w-16'>
                    {!isLoading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>}
                    {isLoading && <div className='w-6 h-6 rounded-full border-4 border-white border-t-transparent border-t-4 mx-auto animate-spin z-10'></div>}
                </button>
            </div>
            <div className='grid grid-cols-4 gap-10'>
                {!isLoading && movies && movies.length > 0 && movies.map(item => (
                    <MovieCard key={item.id} item={item}></MovieCard>
                ))}
            </div>
            <div className='mt-10'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='pagination'
                />
            </div>
        </div>
    );
};

export default MoviePage;