import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    
    return (
        <div className='flex justify-between items-center px-4 md:px-8 py-4 bg-black border-b border-gray-800'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <img className='w-8 md:w-10 text-white' src="https://sdmntpraustraliaeast.oaiusercontent.com/files/00000000-6598-61fa-90c1-643ff3bafb5a/raw?se=2025-09-28T10%3A25%3A49Z&sp=r&sv=2024-08-04&sr=b&scid=f63a6033-974a-5d4d-8204-29773e7a3f8f&skoid=8cb40e9f-389f-4cf6-afaa-e5bd4c7fd98c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-27T16%3A00%3A46Z&ske=2025-09-28T16%3A00%3A46Z&sks=b&skv=2024-08-04&sig=H/ix540Km62aCu5ZmlqIBySyPXn25xzlhAO5DRHIz/w%3D" alt="Logo" />
                <Link to="/" className={`text-xl md:text-2xl font-bold transition duration-300 ${
                    location.pathname === '/' ? 'text-red-500' : 'text-white hover:text-red-400'
                }`}>
                    Movies
                </Link>
                <Link to="/watchlist" className={`text-xl md:text-2xl font-bold transition duration-300 ${
                    location.pathname === '/watchlist' ? 'text-red-500' : 'text-white hover:text-red-400'
                }`}>
                    WatchList
                </Link>
            </div>
        </div>
    )
}

export default Navbar