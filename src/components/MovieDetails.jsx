import { useParams } from 'react-router-dom'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { Navbar } from '../components/Navbar'
import { useEffect } from 'react'

export function Details({ movie }) {
    return (
        <div className='flex flex-col lg:flew-row p-4 gap-2 justify-start items-center h-screen'>
            <h1 className='text-4xl '><strong>{movie.title}</strong></h1>
            <img src={movie.backdrop_url} alt={movie.title} className='h-auto' />
            <section>
                <p className='text-justify'>{movie.overview}</p>
                <p><strong>Rating:</strong> {movie.vote_average}</p>
            </section>
        </div>
    )
}

export function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-white text-4xl p-4">
                <strong>Loading...</strong>
            </h1>
        </div>
    )
}

export default function MovieDetails() {
    const { movie, getMovieDetails, loading } = useMovieDetails()
    const { movieId } = useParams()


    useEffect(() => {
        getMovieDetails({ movieId })
    }, [movieId])

    return (
        <div className='bg-gradient-to-r from-slate-700 to-slate-500 text-white'>
            {loading ? <Loading /> : <>
                <Navbar />
                <Details movie={movie} />
            </>}
        </div>
    )
}
