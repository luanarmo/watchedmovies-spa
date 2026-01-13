import { Link } from 'react-router-dom'

export function ListOfMovies({ movies }) {
    return (
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6 p-4">
            {movies.map((movie) => (
                <li
                    key={movie.id}
                    className="bg-dusty-grape-800 text-dusty-grape-50 shadow-lg shadow-dusty-grape-950/20 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-dusty-grape-700"
                >
                    <Link to={`/movie/${movie.id}`}>
                        <div className="aspect-[2/3] w-full relative">
                            <img
                                src={movie.poster_url}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                                loading='lazy'
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dusty-grape-950/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                                <span className="text-sm font-semibold truncate w-full">{movie.title}</span>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export function NoResults() {
    return <p className='flex items-center justify-center min-h-[50vh] text-xl text-dusty-grape-300'>Results not found!</p>
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0
    return (
        <section className='min-h-screen w-full'>
            {hasMovies ? (
                <ListOfMovies movies={movies} />
            ) : (
                <NoResults />
            )}
        </section>
    )

}