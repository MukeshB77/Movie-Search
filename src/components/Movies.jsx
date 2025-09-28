import React from 'react';
import MovieCard from './MovieCard';
import { useState, useEffect } from "react";
import axios from 'axios';
import Pagination from './Pagination';

const apiKey = "e0f892dde498d078b7a214ca1d9102d0"; 

const GENRES = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 16, name: "Animation" },
    { id: 878, name: "Sci-Fi" }
];

function Movies() {
    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPageNo(1);
    }, [selectedGenre, searchQuery]);

    useEffect(() => {
        setLoading(true);
        let url = '';
        
        if (searchQuery) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pageNo}&query=${encodeURIComponent(searchQuery)}`;
        } else if (selectedGenre) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${pageNo}&with_genres=${selectedGenre}`;
        } else {
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNo}`;
        }

        axios.get(url)
            .then(res => {
                setMovies(res.data.results || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [pageNo, selectedGenre, searchQuery]);

    useEffect(() => {
        const savedWatchlist = localStorage.getItem('watchlist');
        if (savedWatchlist) {
            setWatchlist(JSON.parse(savedWatchlist));
        }
    }, []);

    const addToWatchlist = (movie) => {
        const newWatchlist = [...watchlist, movie];
        setWatchlist(newWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    };

    const removeFromWatchlist = (movieId) => {
        const newWatchlist = watchlist.filter(movie => movie.id !== movieId);
        setWatchlist(newWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some(movie => movie.id === movieId);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
            
            <div className="max-w-6xl mx-auto mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                    />
                    <i className="fi fi-rs-search absolute right-4 top-4 text-red-500 text-lg"></i>
                </div>
            </div>

            
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => setSelectedGenre('')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                            selectedGenre === '' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        All Movies
                    </button>
                    {GENRES.map(genre => (
                        <button
                            key={genre.id}
                            onClick={() => setSelectedGenre(genre.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                                selectedGenre === genre.id 
                                ? 'bg-red-500 text-white' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>

            
            <div className="max-w-6xl mx-auto mb-8 text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                    {searchQuery ? `Search: "${searchQuery}"` : 
                     selectedGenre ? `${GENRES.find(g => g.id == selectedGenre)?.name} Movies` : 
                     'Popular Movies'}
                </h2>
                <div className="w-16 h-1 bg-red-500 mx-auto rounded"></div>
            </div>

            
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    <p className="text-gray-400 mt-2">Loading movies...</p>
                </div>
            )}

            
            <div className="max-w-6xl mx-auto">
                {!loading && movies.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {movies.map((movieObj) => (
                            <MovieCard 
                                key={movieObj.id} 
                                movie={movieObj}
                                isInWatchlist={isInWatchlist(movieObj.id)}
                                onAddToWatchlist={addToWatchlist}
                                onRemoveFromWatchlist={removeFromWatchlist}
                            />
                        ))}
                    </div>
                )}
                
                {!loading && movies.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-xl">No movies found</p>
                    </div>
                )}
            </div>

            {!loading && movies.length > 0 && (
                <Pagination pageNo={pageNo} setPageNo={setPageNo} />
            )}
        </div>
    );
}

export default Movies;