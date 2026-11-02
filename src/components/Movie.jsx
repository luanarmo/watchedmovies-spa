import { Link } from 'react-router-dom'

// The title sits under the poster on phones (there is no hover on touch); from md up it shows over the poster on hover
export function Movie({ movie }) {
    return (
        <li
            className="bg-dusty-grape-800 text-dusty-grape-50 shadow-lg shadow-dusty-grape-950/20 rounded-xl overflow-hidden md:hover:scale-105 transition-transform duration-300 border border-dusty-grape-700"
        >
            <Link to={`/movie/${movie.id}`} className="block">
                <div className="aspect-[2/3] w-full relative">
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading='lazy'
                    />
                    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-dusty-grape-950/80 to-transparent opacity-0 hover:opacity-100 transition-opacity items-end p-2">
                        <span className="text-sm font-semibold truncate w-full">{movie.title}</span>
                    </div>
                </div>
                <p className="md:hidden px-3 py-2 text-sm font-medium leading-snug line-clamp-2 min-h-[3rem]">{movie.title}</p>
            </Link>
        </li>
    )
}
