import React from 'react';
import useSWR from 'swr';
import { apiKey, fetcher } from '../../config/config';
import { SwiperSlide, Swiper } from 'swiper/react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../base';

const Banner = ({ type = "upcoming" }) => {
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`, fetcher);
    const movies = data?.results || [];
    return (
        <section className="banner h-[500px] page-container mb-10 overflow-hidden">
            <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                {movies && movies.length > 0 && movies.map(item => (
                    <SwiperSlide key={item.id}>
                        <BannnerItem item={item}></BannnerItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

function BannnerItem({ item }) {
    const { title, poster_path, id } = item;
    const navigate = useNavigate();
    return (
        <div className="w-full h-full rounded-lg bg-white relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.20)] rounded-lg "></div>
            <img
                className="w-full h-full object-cover rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt="slide"
            />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">{title}</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    <span className=" py-2 px-4 border border-white rounded-md">Actions</span>
                    <span className=" py-2 px-4 border border-white rounded-md">Aventure</span>
                    <span className=" py-2 px-4 border border-white rounded-md">Avenger</span>
                </div>
                <Button onClick={() => navigate(`/movies/${id}`)}>Watch now</Button>
            </div>
        </div>
    )
}

export default Banner;