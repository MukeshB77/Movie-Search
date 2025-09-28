import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function WatchList() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = localStorage.getItem('watchlist');
        if (savedWatchlist) {
            setWatchlist(JSON.parse(savedWatchlist));
        }
    }, []);

    const removeFromWatchlist = (movieId) => {
        const newWatchlist = watchlist.filter(movie => movie.id !== movieId);
        setWatchlist(newWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    };

    const clearWatchlist = () => {
        setWatchlist([]);
        localStorage.removeItem('watchlist');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">My Watchlist</h1>
                    <div className="w-16 h-1 bg-red-500 mx-auto rounded mb-4"></div>
                    
                    {watchlist.length > 0 && (
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-300">
                                {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} in watchlist
                            </span>
                            <button 
                                onClick={clearWatchlist}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                {/* Watchlist Movies */}
                {watchlist.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {watchlist.map((movie) => (
                            <div key={movie.id} className="relative group">
                                <MovieCard 
                                    movie={movie}
                                    isInWatchlist={true}
                                    onRemoveFromWatchlist={removeFromWatchlist}
                                />
                                <button
                                    onClick={() => removeFromWatchlist(movie.id)}
                                    className="absolute top-2 left-2 bg-black/70 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-xl p-8 text-center">
                        <div className="text-red-500 text-6xl mb-4">🎬</div>
                        <h2 className="text-2xl font-semibold text-white mb-2">Your watchlist is empty</h2>
                        <p className="text-gray-400 mb-4">Start adding movies to your watchlist!</p>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
                        >
                            Browse Movies
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WatchList;