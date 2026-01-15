import { Link } from 'react-router-dom'
import { Movie } from './Movie.jsx'

export function ListOfMovies({ movies }) {
    return (
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6 p-4">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} />
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