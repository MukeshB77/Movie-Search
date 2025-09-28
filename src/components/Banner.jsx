import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = "e0f892dde498d078b7a214ca1d9102d0"; 

function Banner() {
    const [bannerMovie, setBannerMovie] = useState(null);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            .then(function (res) {
                const randomMovie = res.data.results[Math.floor(Math.random() * res.data.results.length)];
                setBannerMovie(randomMovie);
            });
    }, []);

    if (!bannerMovie) return <div className="h-20 bg-gray-900"></div>;

    return (
        <div className='h-[40vh] md:h-[75vh] bg-cover bg-center flex items-end relative' 
             style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})` }}>
            <div className='absolute inset-0 bg-black bg-opacity-70'></div>
            <div className='relative text-white w-full p-6 bg-gradient-to-t from-black via-transparent to-transparent'>
                <h1 className='text-2xl md:text-5xl font-bold mb-2 text-white'>{bannerMovie.title}</h1>
                <p className='text-sm md:text-lg text-gray-300'>{bannerMovie.overview?.substring(0, 150)}...</p>
                <div className='flex items-center mt-3'>
                    <span className='bg-red-500 text-white px-3 py-1 rounded-md text-sm mr-4'>
                        ⭐ {bannerMovie.vote_average?.toFixed(1)}
                    </span>
                    <span className='text-gray-300 text-sm'>
                        {new Date(bannerMovie.release_date).getFullYear()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Banner;