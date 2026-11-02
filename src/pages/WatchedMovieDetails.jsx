import { useParams } from 'react-router-dom'
import { Base } from '../components/Base'
import { useWatched } from '../hooks/useWatched'
import { useEffect } from 'react'
import ViewDetailsList from '../components/ViewDetailsList.jsx'
import { TierBadge } from '../components/TierBadge.jsx'
import { BackButton } from '../components/BackButton.jsx'
import { WatchedMovieDetailsSkeleton } from '../components/WatchedMovieDetailsSkeleton.jsx'
import { FaHeart } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function WatchedMovieDetails() {

    const { watchedDetails, getWatchedMovie, loading, setWatchedDetails } = useWatched()
    const { movieId } = useParams()

    const handleTierChange = (tier) => setWatchedDetails(details => ({ ...details, tier }))

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
                        <div className='flex flex-col lg:p-4 gap-4 lg:gap-6 justify-start items-center w-full max-w-4xl mx-auto'>
                            <div className='order-2 lg:order-1 w-full px-5 lg:px-0 -mt-10 lg:mt-0 relative flex items-center lg:justify-center gap-3'>
                                <h1 className='flex-1 lg:flex-none text-3xl lg:text-4xl lg:text-center text-dusty-grape-100 font-bold leading-tight'>{watchedDetails.title}</h1>
                                {watchedDetails.is_favorite && <FaHeart className='text-red-400 text-2xl flex-shrink-0' title='Favorite' />}
                                <div className='flex-shrink-0 lg:hidden'><TierBadge tier={watchedDetails.tier} compact /></div>
                            </div>
                            <div className="order-1 lg:order-2 relative w-full lg:rounded-xl overflow-hidden lg:shadow-2xl shadow-dusty-grape-950/50 lg:border border-dusty-grape-700">
                                <BackButton />
                                <img src={watchedDetails.backdrop_url} alt={watchedDetails.title} className='w-full h-48 lg:h-auto object-cover' />
                                <div className="absolute inset-0 bg-gradient-to-t from-dusty-grape-950 lg:from-dusty-grape-950/90 to-transparent"></div>
                            </div>
                            <div className="order-3 hidden lg:block"><TierBadge tier={watchedDetails.tier} /></div>
                            <div className="order-4 px-5 lg:px-6 lg:py-6 lg:bg-dusty-grape-800/50 lg:rounded-xl lg:border border-dusty-grape-700 lg:backdrop-blur-sm w-full lg:w-3/4">
                                <p className='lg:text-justify text-dusty-grape-100 text-base lg:text-lg leading-relaxed mb-6'>{watchedDetails.overview}</p>
                                <h2 className='text-xl lg:text-2xl font-bold lg:text-center text-dusty-grape-100 border-t lg:border-t-0 lg:border-b border-dusty-grape-800 lg:border-dusty-grape-700 pt-4 lg:pt-0 pb-2 mb-4'> Viewed times </h2>
                                <div className="w-full">
                                    <ViewDetailsList movieId={movieId} movie={watchedDetails} onTierChange={handleTierChange} />
                                </div>
                            </div>
                        </div >
                    )
            }
            <ToastContainer />
        </Base >
    )
}
