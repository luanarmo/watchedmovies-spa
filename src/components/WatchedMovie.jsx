import { FaTrash, FaStar, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { WatchedField } from './WatchedField'

export const WatchedMovie = ({ movie, onDelete, redirect, showWatchedFields = true }) => {
    return (
        <li className="relative flex flex-col bg-dusty-grape-800 text-dusty-grape-50 shadow-lg shadow-dusty-grape-950/30 rounded-xl overflow-hidden border border-dusty-grape-700 transform transition-transform hover:-translate-y-1 group">
            <button
                onClick={() => onDelete(movie.id)}
                className="absolute top-1 right-1 z-10 p-1 rounded-full transition-all bg-transparent text-red-500 opacity-100 lg:bg-dusty-grape-900/60 lg:backdrop-blur-sm lg:text-red-400 lg:hover:text-red-300 lg:hover:bg-dusty-grape-950 lg:opacity-0 lg:group-hover:opacity-100"
            >
                <FaTrash title='Delete' />
            </button>
            <Link to={`/${redirect}/${movie.id}`}>
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