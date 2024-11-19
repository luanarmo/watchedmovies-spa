import { useParams } from 'react-router-dom'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { Base } from '../components/Base'
import { useEffect, useState, useCallback, useContext } from 'react'
import { useWatched } from '../hooks/useWatched.js'
import { Modal } from '../components/Modal.jsx'
import { ViewDetailsForm } from '../components/ViewDetailsForm.jsx'
import { truncateText } from '../utils/truncateText.js'
import { SesionContext } from '../context/sesion'
import { MovieDetailsSkeleton } from './MovieDetailsSkeleton.jsx'

export function Details({ movie }) {

    const MAX_COMMENT_LENGTH = 300;

    const { watchedDetails, loading, error, addWatched, getWatchedMovie } = useWatched()

    const [isWatched, setIsWatched] = useState(false)

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

    const checkWatched = useCallback(() => {
        setIsWatched(watchedDetails.id === movie.id)
    }, [watchedDetails])

    useEffect(() => {
        if (sesion.auth) {
            getWatchedMovie({ movieId: movie.id })
        }
    }, [])

    useEffect(() => {
        if (sesion.auth) {
            checkWatched()
        }
    }, [watchedDetails])

    if (loading && sesion.auth) {
        return <MovieDetailsSkeleton />
    }

    if (error) {
        return <div className='text-white'>{error}</div>
    }

    return (
        <div className='flex flex-col p-4 gap-2 justify-start items-center min-h-screen'>
            <h1 className='text-4xl '><strong>{movie.title}</strong></h1>
            <img src={movie.backdrop_url} alt={movie.title} className='max-w-full h-auto rounded-md' />
            <section className='flex flex-col gap-2 items-center w-full md:w-1/2'>
                {movie.overview.length > MAX_COMMENT_LENGTH ?
                    seeMore ?
                        <p>{movie.overview} <button className='text-blue-500 hover:bg-blue-700' onClick={handleSeeLess}> See less </button></p> :
                        <p>{truncateText(movie.overview, MAX_COMMENT_LENGTH)}<button className='text-blue-500 hover:bg-blue-700' onClick={handleSeeMore}> See more </button></p>
                    : <p>{movie.overview}</p>
                }
                {
                    sesion.auth &&
                    (isWatched ?
                        <button className='bg-purple-500 hover:bg-purple-700 text-white w-1/2 font-bold py-2 px-4 rounded' onClick={handleOpenModal}> 🔖 Viewed again </button> :
                        <button className='bg-blue-500 hover:bg-blue-700 text-white w-1/2 font-bold py-2 px-4 rounded' onClick={handleOpenModal}> 🔖 Add to views</button>)
                }
            </section>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className='text-xl'>Details of the movie viewed</h2>
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
        <div className='bg-gradient-to-r from-slate-700 to-slate-500 text-white'>
            {loading ?
                <MovieDetailsSkeleton /> :
                <Base>
                    <Details movie={movie} />
                </Base>
            }
        </div>
    )
}
