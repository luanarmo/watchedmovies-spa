import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom'

export const WatchedMovie = ({ movie, onDelete }) => {
    return (
        <div className="flex rounded-xl bg-slate-600">
            <Link to={`/watchedDetails/${movie.id}`}>
                <div className='md:shrink-0'>
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="h-48 w-32 object-cover rounded-l-xl"
                    />
                </div>
            </Link>
            <div className="p-2">
                <Link to={`/watchedDetails/${movie.id}`}>
                    <h2 className="text-xl font-bold">{movie.title}</h2>
                    <p className='text-gray-500'>{movie.release_date}</p>
                </Link>
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