import React from 'react';
import { useState } from 'react';

function MovieCard({ movie, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist }) {
    const [imageError, setImageError] = useState(false);

    const handleWatchlistClick = () => {
        if (isInWatchlist) {
            onRemoveFromWatchlist(movie.id);
        } else {
            onAddToWatchlist(movie);
        }
    };

    return (
        <div className="group relative bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
            
            <div className="aspect-[2/3] bg-gray-900 flex items-center justify-center relative">
                {movie.poster_path && !imageError ? (
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="text-red-500 text-4xl">🎬</div>
                )}
                
            
                <button 
                    onClick={handleWatchlistClick}
                    className={`absolute top-2 right-2 p-2 rounded-full transition duration-300 ${
                        isInWatchlist 
                            ? 'bg-red-500 text-white' 
                            : 'bg-black/50 text-white hover:bg-red-500'
                    }`}
                >
                    {isInWatchlist ? '✓' : '+'}
                </button>
            </div>
            
        
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">
                    {movie.title}
                </h3>
                <div className="flex justify-between items-center">
                    <span className="text-yellow-400 text-xs">⭐ {movie.vote_average?.toFixed(1)}</span>
                    <span className="text-gray-300 text-xs">
                        {new Date(movie.release_date).getFullYear()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;