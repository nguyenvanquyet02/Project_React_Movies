import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../base';
import { tmdbApi } from '../../config/config';

const MovieCard = ({ item }) => {
    const { title, vote_average, release_date, poster_path, id } = item;
    const navigate = useNavigate();
    return (
        <div className="movie-card rounded-lg p-3 bg-slate-800 text-white select-none">
            <img
                src={tmdbApi.imageW500(poster_path)}
                alt="movie item"
                className="w-full h-[250px] object-cover rounded-lg mb-5"
            />
            <h3 className=" text-lg font-bold mb-3 h-[56px]">{title}</h3>
            <div className="flex items-center justify-between text-sm opacity-50 mb-5">
                <span>{new Date(release_date).getFullYear()}</span>
                <span>{vote_average}</span>
            </div>
            <Button full onClick={() => navigate(`/movies/${id}`)}>Watch now</Button>
        </div>
    );
};

export default MovieCard;