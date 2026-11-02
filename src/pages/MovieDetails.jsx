import { Link, useParams } from 'react-router-dom'
import { BackButton } from '../components/BackButton.jsx'
import { TierBadge } from '../components/TierBadge.jsx'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { Base } from '../components/Base'
import { useEffect, useState, useContext } from 'react'
import { useWatched } from '../hooks/useWatched.js'
import { usePlan } from '../hooks/usePlan.js'
import { Modal } from '../components/Modal.jsx'
import { ViewDetailsForm } from '../components/ViewDetailsForm.jsx'
import { truncateText } from '../utils/truncateText.js'
import { SesionContext } from '../context/sesion'
import { MovieDetailsSkeleton } from '../components/MovieDetailsSkeleton.jsx'

export function Details({ movie }) {

    const MAX_COMMENT_LENGTH = 300;

    const { addWatched } = useWatched()
    const { addPlan } = usePlan()

    const [isWatched, setIsWatched] = useState(movie.is_watched)
    const [isPlan, setIsPlan] = useState(movie.is_plan_to_watch)
    const [tier, setTier] = useState(movie.tier)

    const [seeMore, setSeeMore] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { sesion } = useContext(SesionContext)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handleSeeMore = () => setSeeMore(true)
    const handleSeeLess = () => setSeeMore(false)

    const handleAddToWatched = ({ payload, movie }) => {
        addWatched(movie, payload)
        setIsWatched(true)
        setTier(payload.tier)
    }

    const handleAddPlan = () => {
        addPlan(movie)
        setIsPlan(true)
    }

    const seeMoreButton = 'text-coral hover:brightness-110 font-bold transition-colors ml-1 px-1 py-3 -my-3 lg:p-0 lg:m-0 lg:ml-1'

    return (
        <div className='flex flex-col lg:p-4 gap-4 lg:gap-6 justify-start items-center w-full max-w-4xl mx-auto pb-32 lg:pb-4'>
            <div className='order-2 lg:order-1 w-full px-5 lg:px-0 -mt-10 lg:mt-0 relative flex items-center justify-between gap-3'>
                <h1 className='flex-1 text-3xl lg:text-4xl lg:text-center text-dusty-grape-100 font-bold leading-tight'>{movie.title}</h1>
                {isWatched && <TierBadge tier={tier} compact />}
            </div>
            <div className="order-1 lg:order-2 relative w-full lg:rounded-xl overflow-hidden lg:shadow-2xl shadow-dusty-grape-950/50 lg:border border-dusty-grape-700">
                <BackButton />
                <img src={movie.backdrop_url} alt={movie.title} className='w-full h-56 lg:h-auto object-cover' />
                <div className="absolute inset-0 bg-gradient-to-t from-dusty-grape-950 lg:from-dusty-grape-950/90 to-transparent"></div>
            </div>
            <section className='order-3 flex flex-col gap-4 items-center w-full lg:w-3/4 px-5 lg:px-6 lg:py-6 lg:bg-dusty-grape-800/50 lg:rounded-xl lg:border border-dusty-grape-700 lg:backdrop-blur-sm'>
                <div className="text-dusty-grape-100 text-base lg:text-lg leading-relaxed lg:text-justify">
                    {movie.overview.length > MAX_COMMENT_LENGTH ?
                        seeMore ?
                            <p>{movie.overview} <button className={seeMoreButton} onClick={handleSeeLess}> See less </button></p> :
                            <p>{truncateText(movie.overview, MAX_COMMENT_LENGTH)}<button className={seeMoreButton} onClick={handleSeeMore}> See more </button></p>
                        : <p>{movie.overview}</p>
                    }
                </div>

                {sesion.auth && (
                    // Pinned above the bottom tab bar on phones, so the actions stay under the thumb
                    <div className="fixed lg:static inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-30 lg:z-auto flex gap-3 w-full px-5 py-3 lg:p-0 lg:mt-4 bg-dusty-grape-950 lg:bg-transparent border-t border-dusty-grape-800 lg:border-0">
                        {isWatched ? (
                            <>
                                <button
                                    className="flex-1 min-h-[52px] bg-coral hover:brightness-110 text-dusty-grape-950 font-bold px-6 rounded-full shadow-md transition-all"
                                    onClick={handleOpenModal}
                                >
                                    Viewed again
                                </button>
                                <Link
                                    to={`/watchedDetails/${movie.id}`}
                                    className="flex-1 min-h-[52px] flex items-center justify-center border border-coral text-coral font-bold px-6 rounded-full transition-colors hover:bg-dusty-grape-800"
                                >
                                    My views
                                </Link>
                            </>
                        ) : (
                            <>
                                <button
                                    className="flex-1 min-h-[52px] bg-coral hover:brightness-110 text-dusty-grape-950 font-bold px-6 rounded-full shadow-md transition-all"
                                    onClick={handleOpenModal}
                                >
                                    Add to views
                                </button>
                                {!isPlan && (
                                    <button
                                        className="flex-1 min-h-[52px] border border-coral text-coral hover:bg-dusty-grape-800 font-bold px-6 rounded-full transition-colors"
                                        onClick={handleAddPlan}
                                    >
                                        Add to plan
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}

            </section>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ViewDetailsForm movie={{ ...movie, tier }} onClose={handleCloseModal} onSubmit={handleAddToWatched} />
            </Modal>

        </div>
    )
}

export default function MovieDetails() {
    const { movie, getMovieDetails, loading } = useMovieDetails()
    const { movieId } = useParams()
    const { sesion } = useContext(SesionContext)

    useEffect(() => {
        getMovieDetails({ movieId, token: sesion.access })
    }, [movieId])

    return (
        <div className='bg-transparent text-dusty-grape-50'>
            {loading ?
                <MovieDetailsSkeleton /> :
                <Base>
                    <Details movie={movie} />
                </Base>
            }
        </div>
    )
}
