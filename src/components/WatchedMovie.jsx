import { FaTrash, FaEye, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { WatchedField } from './WatchedField'
import { TierBadge } from './TierBadge'
import { formatDate } from '../utils/formatDate.js'

// Below md it is a diary row (small poster + info + delete); from md up it is the poster card
export const WatchedMovie = ({ movie, onDelete, redirect, showWatchedFields = true }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(movie.id);
    };

    return (
        <li className="relative flex flex-row items-center gap-3 py-3 border-t border-dusty-grape-800 md:flex-col md:items-stretch md:gap-0 md:py-0 md:border-t-0 md:bg-dusty-grape-800 text-dusty-grape-50 md:shadow-lg md:shadow-dusty-grape-950/30 md:rounded-xl overflow-hidden md:border md:border-dusty-grape-700 md:transform md:transition-transform md:hover:-translate-y-1 group">
            {/* Desktop Delete Button */}
            <button
                onClick={handleDelete}
                aria-label="Delete"
                className="hidden lg:block absolute top-1 right-1 z-20 p-1 rounded-full transition-all bg-dusty-grape-900/60 backdrop-blur-sm text-red-400 hover:text-red-300 hover:bg-dusty-grape-950 opacity-0 group-hover:opacity-100"
            >
                <FaTrash title='Delete' />
            </button>

            <Link to={`/${redirect}/${movie.imdb_id}`} className="flex flex-1 min-w-0 items-center gap-3 md:block md:flex-none">
                <div className="w-14 flex-none aspect-[2/3] rounded-lg overflow-hidden md:w-full md:rounded-none relative">
                    <img
                        src={movie.poster_url}
                        alt={movie.title ?? ''}
                        className="w-full h-full object-cover"
                        loading='lazy'
                    />
                </div>
                {/* Mobile row info */}
                <div className="md:hidden flex flex-col gap-1 min-w-0">
                    {movie.title && <span className="text-base font-medium truncate">{movie.title}</span>}
                    {showWatchedFields && (
                        <>
                            {movie.first_watched_date && <span className="text-sm text-dusty-grape-200">{formatDate(movie.first_watched_date)}</span>}
                            <div className="flex items-center gap-3 text-sm text-dusty-grape-200">
                                <WatchedField field={`${movie.total_views} ${movie.total_views === 1 ? 'view' : 'views'}`} icon={<FaEye className="text-dusty-grape-300" />} />
                                {movie.is_favorite && <FaHeart className="text-red-400" title="Favorite" />}
                            </div>
                        </>
                    )}
                </div>
            </Link>

            {/* Tier of the movie, only on the diary row */}
            {showWatchedFields && <div className="md:hidden flex-none"><TierBadge tier={movie.tier} /></div>}

            {/* Mobile delete: always visible, 44px target (no hidden context menu) */}
            <button
                onClick={handleDelete}
                aria-label="Delete"
                className="lg:hidden flex-none flex items-center justify-center w-11 h-11 rounded-full text-red-400 hover:bg-dusty-grape-800 transition-colors md:absolute md:top-1 md:right-1 md:z-20 md:bg-dusty-grape-900/70"
            >
                <FaTrash size={16} />
            </button>

            {/* Card footer (md+) */}
            {showWatchedFields && (
                <div className="hidden md:flex gap-4 items-center justify-center min-h-[3.5rem] p-2 bg-dusty-grape-800">
                    <WatchedField field={movie.total_views} icon={<FaEye className="text-dusty-grape-300" />} />
                    {movie.is_favorite && <FaHeart className="text-red-400" title="Favorite" />}
                </div>
            )}
        </li>
    );
};
