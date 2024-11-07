import { FaTrash, FaStar, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { WatchedField } from './WatchedField'

export const WatchedMovie = ({ movie, onDelete }) => {
    return (
        <li className="flex flex-col bg-slate-600 text-white shadow-lg rounded-lg overflow-hidden">
            <Link to={`/watchedDetails/${movie.id}`}>
                <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading='lazy'
                />
            </Link>
            <div className="flex gap-2 items-center justify-center min-h-10">
                <WatchedField field={movie.total_views} icon={<FaEye />} />
                <WatchedField field={movie.average_rating} icon={<FaStar className='text-yellow-400' />} />
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => onDelete(movie.id)}
                        className="text-red-500 hover:text-red-600"
                    >
                        <FaTrash title='Eliminar vista' />
                    </button>
                </div>
            </div>
        </li>
    );
};