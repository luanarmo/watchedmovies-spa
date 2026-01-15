import { FaTrash, FaStar, FaEye, FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { WatchedField } from './WatchedField'
import { useState } from 'react';

export const WatchedMovie = ({ movie, onDelete, redirect, showWatchedFields = true }) => {
    const [showContext, setShowContext] = useState(false);

    const toggleContext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowContext(prev => !prev);
    };

    return (
        <li className="relative flex flex-col bg-dusty-grape-800 text-dusty-grape-50 shadow-lg shadow-dusty-grape-950/30 rounded-xl overflow-hidden border border-dusty-grape-700 transform transition-transform hover:-translate-y-1 group">
            {/* Desktop Delete Button */}

            <button
                onClick={(e) => {
                    e.preventDefault();
                    onDelete(movie.id);
                }}
                className="hidden lg:block absolute top-1 right-1 z-20 p-1 rounded-full transition-all bg-dusty-grape-900/60 backdrop-blur-sm text-red-400 hover:text-red-300 hover:bg-dusty-grape-950 opacity-0 group-hover:opacity-100"
            >
                <FaTrash title='Delete' />
            </button>

            {/* Mobile Context Menu */}
            <div className="lg:hidden absolute top-1 right-1 z-20 flex flex-col items-end gap-1">
                <button
                    onClick={toggleContext}
                    className="p-1.5 rounded-full bg-black/40 text-dusty-grape-100 backdrop-blur-sm hover:bg-black/60 transition-colors"
                >
                    <FaEllipsisV size={14} />
                </button>

                <div
                    className={`transition-all duration-200 origin-top-right ${showContext
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        }`}
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onDelete(movie.id);
                        }}
                        className="p-2 rounded-full bg-red-500/90 text-white shadow-lg backdrop-blur-sm hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>

            <Link to={`/${redirect}/${movie.imdb_id}`}>
                <div className="aspect-[2/3] w-full relative">
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading='lazy'
                    />
                </div>
            </Link>
            {showWatchedFields && (
                <div className="flex gap-1 md:gap-4 items-center justify-center min-h-[3.5rem] p-2 bg-dusty-grape-800">
                    <WatchedField field={movie.total_views} icon={<FaEye className="text-dusty-grape-300" />} />
                    <WatchedField field={movie.average_rating} icon={<FaStar className='text-yellow-400' />} />
                </div>
            )}
        </li>
    );
};