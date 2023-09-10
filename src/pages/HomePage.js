import React from 'react';
import { MoviesList } from '../components';

const HomePage = () => {
    return (
        <>
            <section className="movies-layout page-container pb-16">
                <h2 className="capitalize text-white mb-5 text-3xl font-bold">Now playing</h2>
                <MoviesList
                >
                </MoviesList>
            </section>

            <section className="movies-layout page-container pb-16">
                <h2 className="capitalize text-white mb-5 text-3xl font-bold">Top rated</h2>

                <MoviesList type="top_rated"></MoviesList>
            </section>
            <section className="movies-layout page-container pb-16">
                <h2 className="capitalize text-white mb-5 text-3xl font-bold">Top trending</h2>
                <MoviesList type="popular"></MoviesList>
            </section>
        </>
    );
};

export default HomePage;