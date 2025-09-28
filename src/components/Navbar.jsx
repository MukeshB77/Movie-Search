import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    
    return (
        <div className='flex justify-between items-center px-4 md:px-8 py-4 bg-black border-b border-gray-800'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <img className='w-8 md:w-10' src="https://cdn-icons-png.flaticon.com/128/5009/5009089.png" alt="Logo" />
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