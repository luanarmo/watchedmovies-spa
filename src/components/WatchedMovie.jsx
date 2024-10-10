import { FaTrash, FaStar, FaCalendar, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { WatchedField } from './WatchedField'

export const WatchedMovie = ({ movie, onDelete }) => {
    return (
        <div className="flex rounded-xl bg-slate-600">
            <Link to={`/watchedDetails/${movie.id}`}>
                <div className='w-32'>
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="object-cover rounded-l-xl"
                    />
                </div>
            </Link>
            <div className="p-2">
                <Link to={`/watchedDetails/${movie.id}`}>
                    <h2 className="text-xl font-bold">{movie.title}</h2>
                </Link>
                <WatchedField field={movie.release_date} icon={<FaCalendar />} />
                <WatchedField field={movie.total_views} icon={<FaEye />} />
                <WatchedField field={movie.average_rating} icon={<FaStar className='text-yellow-400' />} />
                <div className="mt-4 space-x-4">
                    <button
                        onClick={() => onDelete(movie.id)}
                        className="text-red-500 hover:text-red-600"
                    >
                        <FaTrash title='Eliminar vista' />
                    </button>
                </div>
            </div>
        </div>
    );
};