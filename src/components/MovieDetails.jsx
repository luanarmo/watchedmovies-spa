import { useParams } from 'react-router-dom'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { Base } from '../components/Base'
import { useEffect, useState, useCallback, useContext } from 'react'
import { useWatched } from '../hooks/useWatched.js'
import { usePlan } from '../hooks/usePlan.js'
import { Modal } from '../components/Modal.jsx'
import { ViewDetailsForm } from '../components/ViewDetailsForm.jsx'
import { truncateText } from '../utils/truncateText.js'
import { SesionContext } from '../context/sesion'
import { MovieDetailsSkeleton } from './MovieDetailsSkeleton.jsx'

export function Details({ movie }) {

    const MAX_COMMENT_LENGTH = 300;

    const { watchedDetails, loading, error, addWatched, getWatchedMovie } = useWatched()
    const { planDetails, addPlan, getPlan } = usePlan()

    const [isWatched, setIsWatched] = useState(false)
    const [isPlan, setIsPlan] = useState(false)

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
    }

    const handleAddPlan = () => {
        addPlan(movie)
        setIsPlan(true)
    }

    const checkWatched = useCallback(() => {
        setIsWatched(watchedDetails.id === movie.id)
    }, [watchedDetails])

    const checkPlan = useCallback(() => {
        setIsPlan(planDetails !== null)
    }, [planDetails])

    useEffect(() => {
        if (sesion.auth) {
            getWatchedMovie({ movieId: movie.id })
            getPlan({ movieId: movie.id })
        }
    }, [])

    useEffect(() => {
        if (sesion.auth) {
            checkWatched()
        }
    }, [watchedDetails])

    useEffect(() => {
        if (sesion.auth) {
            checkPlan()
        }
    }, [planDetails])

    if (loading && sesion.auth) {
        return <MovieDetailsSkeleton />
    }

    if (error) {
        return <div className='text-white'>{error}</div>
    }

    return (
        <div className='flex flex-col p-4 gap-6 justify-start items-center w-full max-w-4xl mx-auto'>
            <h1 className='text-4xl text-center text-dusty-grape-100 font-bold'>{movie.title}</h1>
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl shadow-dusty-grape-950/50 border border-dusty-grape-700">
                <img src={movie.backdrop_url} alt={movie.title} className='w-full h-auto object-cover' />
                <div className="absolute inset-0 bg-gradient-to-t from-dusty-grape-950/90 to-transparent"></div>
            </div>
            <section className='flex flex-col gap-4 items-center w-full md:w-3/4 bg-dusty-grape-800/50 p-6 rounded-xl border border-dusty-grape-700 backdrop-blur-sm'>
                <div className="text-dusty-grape-100 text-lg leading-relaxed text-justify">
                    {movie.overview.length > MAX_COMMENT_LENGTH ?
                        seeMore ?
                            <p>{movie.overview} <button className='text-dusty-grape-300 hover:text-dusty-grape-100 font-semibold transition-colors ml-1' onClick={handleSeeLess}> See less </button></p> :
                            <p>{truncateText(movie.overview, MAX_COMMENT_LENGTH)}<button className='text-dusty-grape-300 hover:text-dusty-grape-100 font-semibold transition-colors ml-1' onClick={handleSeeMore}> See more </button></p>
                        : <p>{movie.overview}</p>
                    }
                </div>

                {sesion.auth && (
                    <div className="flex gap-4 w-full mt-4">
                        {isWatched ? (
                            <button
                                className="flex-1 bg-dusty-grape-600 hover:bg-dusty-grape-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
                                onClick={handleOpenModal}
                            >
                                🔖 Viewed again
                            </button>
                        ) : (
                            <>
                                <button
                                    className="flex-1 bg-dusty-grape-600 hover:bg-dusty-grape-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
                                    onClick={handleOpenModal}
                                >
                                    🔖 Add to views
                                </button>
                                {!isPlan && (
                                    <button
                                        className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
                                        onClick={handleAddPlan}
                                    >
                                        📅 Add to plan
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}

            </section>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className='text-2xl font-bold text-dusty-grape-100 mb-4 border-b border-dusty-grape-700 pb-2'>Details of the movie viewed</h2>
                <ViewDetailsForm movie={movie} onClose={handleCloseModal} onSubmit={handleAddToWatched} />
            </Modal>

        </div>
    )
}

export default function MovieDetails() {
    const { movie, getMovieDetails, loading } = useMovieDetails()
    const { movieId } = useParams()


    useEffect(() => {
        getMovieDetails({ movieId })
    }, [])

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
