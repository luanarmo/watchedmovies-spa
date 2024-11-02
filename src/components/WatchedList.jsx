import { Base } from './Base.jsx'
import { SesionContext } from '../context/sesion.jsx'
import { useWatched } from '../hooks/useWatched.js'
import { WatchedMovie } from './WatchedMovie.jsx'
import { WatchedMovieSkeleton } from './watchedMovieSkeleton.jsx'
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Watched() {

    const { isExpired } = useContext(SesionContext)
    const { watched, loading, error, removeWatched, fetchWatched } = useWatched()

    const navigate = useNavigate()

    useEffect(() => {
        if (isExpired()) {
            navigate('/login')
        }
        fetchWatched()
    }, [fetchWatched, isExpired, navigate])

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
