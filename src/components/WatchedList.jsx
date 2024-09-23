import { Base } from './Base.jsx'
import { useWatched } from '../hooks/useWatched.js'
import { Loading } from './Loading.jsx'
import { WatchedMovie } from './WatchedMovie.jsx'
import { useEffect } from 'react'

export default function Watched() {

    const { watched, loading, error, removeWatched, fetchWatched } = useWatched()

    useEffect(() => {
        fetchWatched()
    }, [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div className='text-white'>{error}</div>
    }

    return (
        <Base>
            <div className='flex flex-col gap-2 p-2 bg-slate-950 text-white h-screen overflow-y-auto max-h-[calc(100vh-8rem)]'>
                {watched.map((movie) => (
                    <WatchedMovie key={movie.id} movie={movie} onDelete={removeWatched} />
                ))}
            </div>
        </Base>
    )
}
