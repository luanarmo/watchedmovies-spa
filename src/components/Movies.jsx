import { Link } from 'react-router-dom'

export function ListOfMovies({ movies }) {
    return (
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4 bg-slate-950">
            {movies.map((movie) => (
                <li
                    key={movie.id}
                    className="bg-slate-600 text-white shadow-lg rounded-lg overflow-hidden"
                >
                    <Link to={`/movie/${movie.id}`}>
                        <img
                            src={movie.poster_url}
                            alt={movie.title}
                            className="w-full h-auto object-cover"
                            loading='lazy'
                        />
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export function NoResults() {
    return <p className='min-h-screen gap-4 p-4 bg-slate-950'>No se encontraron resultados!</p>
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0
    return (
        <section>
            {hasMovies ? (
                <ListOfMovies movies={movies} />
            ) : (
                <NoResults />
            )}
        </section>
    )

}