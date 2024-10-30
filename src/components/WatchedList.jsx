import { Base } from './Base.jsx'
import { useWatched } from '../hooks/useWatched.js'
import { WatchedMovie } from './WatchedMovie.jsx'
import { WatchedMovieSkeleton } from './watchedMovieSkeleton.jsx'
import { useEffect } from 'react'

export default function Watched() {

    const { watched, loading, error, removeWatched, fetchWatched } = useWatched()

    useEffect(() => {
        fetchWatched()
    }, [fetchWatched])

    if (error) {
        return <div className='text-white'>{error}</div>
    }

    return (
        <Base>
            <div className='flex flex-col gap-2 p-2 bg-slate-950 text-white h-screen overflow-y-auto max-h-[calc(100vh-8rem)]'>
                {loading ? (
                    Array.from({ length: 10 }).map((_, index) => <WatchedMovieSkeleton key={index} />)
                ) : (
                    watched.map((movie) => (
                        <WatchedMovie key={movie.id} movie={movie} onDelete={removeWatched} />
                    ))
                )
                }
            </div>
        </Base>
    )
}
