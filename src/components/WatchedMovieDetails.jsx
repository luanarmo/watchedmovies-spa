import { useParams } from 'react-router-dom'
import { Base } from '../components/Base'
import { useWatched } from '../hooks/useWatched'
import { useEffect } from 'react'
import ViewDetailsList from './ViewDetailsList.jsx'
import { WatchedMovieDetailsSkeleton } from './WatchedMovieDetailsSkeleton.jsx'

export default function WatchedMovieDetails() {

    const { watchedDetails, getWatchedMovie, loading } = useWatched()
    const { movieId } = useParams()

    useEffect(() => {
        getWatchedMovie({ movieId })
    }, [])

    return (
        <Base>
            {
                loading
                    ?
                    (
                        <WatchedMovieDetailsSkeleton />
                    ) : (
                        <div className='flex flex-col p-4 gap-6 justify-start items-center w-full max-w-4xl mx-auto'>
                            <h1 className='text-4xl text-center text-dusty-grape-100 font-bold'>{watchedDetails.title}</h1>
                            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl shadow-dusty-grape-950/50 border border-dusty-grape-700">
                                <img src={watchedDetails.backdrop_url} alt={watchedDetails.title} className='w-full h-auto object-cover' />
                                <div className="absolute inset-0 bg-gradient-to-t from-dusty-grape-950/90 to-transparent"></div>
                            </div>
                            <div className="bg-dusty-grape-800/50 p-6 rounded-xl border border-dusty-grape-700 backdrop-blur-sm w-full md:w-3/4">
                                <p className='text-justify text-dusty-grape-100 text-lg leading-relaxed mb-6'>{watchedDetails.overview}</p>
                                <h1 className='text-2xl font-bold text-center text-dusty-grape-100 border-b border-dusty-grape-700 pb-2 mb-4'> Viewed times </h1>
                                <div className="overflow-x-auto w-full custom-scrollbar">
                                    <div className="flex space-x-4 p-2">
                                        <ViewDetailsList movieId={movieId} />
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
            }
        </Base >
    )
}
