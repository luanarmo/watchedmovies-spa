import { useParams } from 'react-router-dom'
import { Base } from '../components/Base'
import { useWatched } from '../hooks/useWatched'
import { useEffect } from 'react'
import { Loading } from '../components/Loading.jsx'
import ViewDetailsList from './ViewDetailsList.jsx'

export default function WatchedMovieDetails() {

    const { watchedDetails, getWatchedMovie } = useWatched()
    const { movieId } = useParams()

    useEffect(() => {
        getWatchedMovie({ movieId })
    }, [])

    return (
        <Base>
            {watchedDetails ? (
                <div className='flex flex-col p-4 gap-2 justify-start items-center bg-slate-950 text-white'>
                    <h1 className='text-4xl '><strong>{watchedDetails.title}</strong></h1>
                    <img src={watchedDetails.backdrop_url} alt={watchedDetails.title} className='h-auto rounded-md' />
                    <p className='text-justify'>{watchedDetails.overview}</p>
                    <h1 className='text-2xl font-semibold text-center'> Viewed times </h1>
                    <div className="overflow-x-auto w-full">
                        <div className="flex space-x-4 p-0">
                            <ViewDetailsList movieId={movieId} />
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </Base>
    )
}
