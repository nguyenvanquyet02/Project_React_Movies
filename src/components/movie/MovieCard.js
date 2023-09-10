import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../base';
import { tmdbApi } from '../../config/config';
import Proptypes from 'prop-types'
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from '../loading/LoadingSkeleton';


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

MovieCard.prototype = {
    item: Proptypes.shape({
        title: Proptypes.string,
        vote_average: Proptypes.number,
        release_date: Proptypes.string,
        poster_path: Proptypes.string,
        id: Proptypes.string
    })
}
function fallbackRender({ error }) {
    return (
        <div role="alert">
            <p>Something went wrong: </p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}
export default withErrorBoundary(MovieCard, {
    FallbackComponent: fallbackRender,
});

export const MovieCardSkeleton = () => {
    return (
        <div className="movie-card rounded-lg p-3 bg-slate-800 text-white select-none">
            <LoadingSkeleton className="w-full h-[250px] object-cover rounded-lg mb-5"></LoadingSkeleton>
            <h3 className=" text-lg font-bold mb-3 h-[56px]">
                <LoadingSkeleton className="w-full h-[20px]"></LoadingSkeleton>
            </h3>
            <div className="flex items-center justify-between text-sm opacity-50 mb-5">
                <span><LoadingSkeleton className="w-[50px] h-[10px]"></LoadingSkeleton></span>
                <span><LoadingSkeleton className="w-[30px] h-[10px]"></LoadingSkeleton></span>
            </div>
            <LoadingSkeleton className="w-full h-[48px] rounded-lg"></LoadingSkeleton>
        </div>
    )
}