import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react'
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from 'swr';
import { fetcher, tmdbApi } from '../../config/config';
import Proptypes from 'prop-types'
import { withErrorBoundary } from "react-error-boundary";

const MoviesList = ({ type = "now_playing" }) => {
    const { data, error, isLoading } = useSWR(tmdbApi.getMovieList(type), fetcher);

    const movies = data?.results || [];

    return (
        <div className="movies-list">
            {isLoading && <>
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                </Swiper>
            </>}

            {!isLoading && <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {movies && movies.length > 0 && movies.map(item => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>}
        </div>
    );
};

function fallbackRender({ error }) {
    return (
        <div role="alert">
            <p>Something went wrong: </p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}
MoviesList.prototype = {
    type: Proptypes.string
}
export default withErrorBoundary(MoviesList, {
    FallbackComponent: fallbackRender
});