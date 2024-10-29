import { SesionContext } from '../context/sesion'
import { useState, useCallback, useContext } from 'react'
import { getWatched, addWatched as addWatchedMovie, removeWatched as removeWatchedMovie, getWatchedDetails } from '../services/watchedMoviesServices'


export const useWatched = () => {
    const [watched, setWatched] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [watchedDetails, setWatchedDetails] = useState({})

    const { sesion } = useContext(SesionContext)

    const fetchWatched = useCallback(async (page = 1) => {
        try {
            const watchedMapped = await getWatched({ access: sesion.access, page })
            setWatched(watchedMapped)
        } catch (error) {
            setError("Error fetching watched movies")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const addWatched = async (movie, payload) => {
        try {
            await addWatchedMovie({ movie, payload, access: sesion.access })
            setWatched([...watched, movie])
        } catch (error) {
            console.error(error)
            setError("Error adding movie to watched")
        }
    }

    const removeWatched = async (movieId) => {
        try {
            await removeWatchedMovie({ movieId: movieId, access: sesion.access })
            setWatched(watched.filter((watchedMovie) => watchedMovie.id !== movieId))
        } catch (error) {
            console.error(error)
            setError("Error removing movie from watched")
        }
    }

    const getWatchedMovie = useCallback(async ({ movieId }) => {
        try {
            const watched = await getWatchedDetails({ movieId, access: sesion.access })
            setWatchedDetails(watched)
        } catch (error) {
            setError("Error fetching watched movie")
            console.error(error)
        }
    }, [])

    return { watched, watchedDetails, loading, error, addWatched, removeWatched, fetchWatched, getWatchedMovie }
}