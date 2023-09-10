import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react'
import MovieCard from "./MovieCard";
import useSWR from 'swr';
import { fetcher, tmdbApi } from '../../config/config';


const MoviesList = ({ type = "now_playing" }) => {
    const { data } = useSWR(tmdbApi.getMovieList(type), fetcher);

    const movies = data?.results || [];

    return (
        <div className="movies-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {movies && movies.length > 0 && movies.map(item => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MoviesList;