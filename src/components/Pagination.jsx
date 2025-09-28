import React from 'react';

function Pagination({ pageNo, setPageNo }) {
    const handlePrev = () => pageNo > 1 && setPageNo(prev => prev - 1);
    const handleNext = () => setPageNo(prev => prev + 1);

    return (
        <div className='flex justify-center items-center space-x-4 py-8'>
            <button 
                onClick={handlePrev}
                disabled={pageNo === 1}
                className={`flex items-center px-4 py-2 rounded-lg transition duration-300 ${
                    pageNo === 1 
                    ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
            >
                <i className="fi fi-rs-angle-left mr-2"></i>
                Prev
            </button>
            
            <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold border border-gray-700">
                Page {pageNo}
            </span>
            
            <button 
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300"
            >
                Next
                <i className="fi fi-rs-angle-right ml-2"></i>
            </button>
        </div>
    );
}

export default Pagination;