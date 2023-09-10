import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { SwiperSlide, Swiper } from 'swiper/react'
import { fetcher, tmdbApi } from '../config/config';
import MovieCard from '../components/movie/MovieCard';

const MovieDetail = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbApi.getMovieDetail(movieId), fetcher);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;
    return (
        <div className='pb-10'>
            <div className='w-full h-[600px] relative '>
                <div className='absolute inset-0 bg-black bg-opacity-60'></div>
                <div className='w-full h-full bg-cover bg-no-repeat' style={{
                    backgroundImage: `url(${tmdbApi.imageOriginal(backdrop_path)})`
                }}></div>
            </div>
            <div className='w-full h-[300px] max-w-[800px] mx-auto mt-[-160px] relative z-10 pb-10'>
                <img
                    className='w-full h-full object-cover rounded-md'
                    src={tmdbApi.imageOriginal(poster_path)} alt='movie' />
            </div>
            <h1 className='text-center text-3xl mb-10'>{title}</h1>
            {genres && genres.length > 0 &&
                <div className='flex items-center justify-center gap-x-5 mb-10'>
                    {genres.map(item => (
                        <span className='py-2 px-4 border border-primary text-primary rounded-md' key={item.id}>{item.name}</span>
                    ))}
                </div>}
            <p className='text-center leading-relaxed max-w-[600px] mx-auto mb-16'>{overview}</p>
            {/* <MovieCredits></MovieCredits>
            <MovieVideos></MovieVideos>
            <MovieSimilar></MovieSimilar> */}
            <MovieMeta type="credits"></MovieMeta>
            <MovieMeta type="videos"></MovieMeta>
            <MovieMeta type="similar"></MovieMeta>
        </div>
    );
};

function MovieMeta({ type = "videos" }) {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbApi.getMovieMeta(movieId, type), fetcher);
    if (!data) return null;
    if (type === "credits") {
        const { cast } = data;
        if (!cast || cast.length <= 0) return null;
        return (
            <>
                <h2 className='text-center text-2xl mb-10'>Casts</h2>
                <div className='grid grid-cols-4 gap-10 mb-10'>
                    {cast.slice(0, 4).map(item => (
                        <div className='cast-item' key={item.id}>
                            <img
                                className='w-full h-[300px] object-cover rounded-md mb-3'
                                src={tmdbApi.imageOriginal(item.profile_path)}
                                alt='cast' />
                            <h3 className='text-lg text-center font-medium'>{item.name}</h3>
                        </div>
                    ))}
                </div>
            </>
        )
    }
    else {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        if (type === 'videos') {
            return (
                <div className='py-10'>
                    <div className='flex flex-col gap-6'>
                        {results.slice(0, 1).map(item => (
                            <div key={item.id}>
                                <h3 className='mb-3 text-xl font-medium p-3 bg-secondary inline-block'>{item.name}</h3>
                                <div className='w-full aspect-video'>
                                    <iframe
                                        width="560" height="315" src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
                                        className="w-full h-full object-fill"
                                    >
                                    </iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        if (type === "similar") {
            return (
                <div className='py-10'>
                    <h2 className='text-2xl font-medium mb-10'>Similar movie</h2>
                    <div className="movies-list">
                        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                            {results && results.length > 0 && results.map(item => (
                                <SwiperSlide key={item.id}>
                                    <MovieCard item={item}></MovieCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )
        }
    }
    return null;
}
{/* function MovieCredits() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbApi.getMovieMeta(movieId, "credits"), fetcher);
    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
        <>
            <h2 className='text-center text-2xl mb-10'>Casts</h2>
            <div className='grid grid-cols-4 gap-10 mb-10'>
                {cast.slice(0, 4).map(item => (
                    <div className='cast-item' key={item.id}>
                        <img
                            className='w-full h-[300px] object-cover rounded-md mb-3'
                            src={tmdbApi.imageOriginal(item.profile_path)}
                            alt='cast' />
                        <h3 className='text-lg text-center font-medium'>{item.name}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

function MovieVideos() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbApi.getMovieMeta(movieId, "videos"), fetcher);
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className='py-10'>
            <div className='flex flex-col gap-6'>
                {results.slice(0, 1).map(item => (
                    <div key={item.id}>
                        <h3 className='mb-3 text-xl font-medium p-3 bg-secondary inline-block'>{item.name}</h3>
                        <div className='w-full aspect-video'>
                            <iframe
                                width="560" height="315" src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
                                className="w-full h-full object-fill"
                            >
                            </iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbApi.getMovieMeta(movieId, "similar"), fetcher);
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className='py-10'>
            <h2 className='text-2xl font-medium mb-10'>Similar movie</h2>
            <div className="movies-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {results && results.length > 0 && results.map(item => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
} */}
export default MovieDetail;