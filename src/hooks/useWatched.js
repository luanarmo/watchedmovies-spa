import { SessionContext } from '../context/session'
import { useState, useCallback, useContext } from 'react'
import { getWatched, addWatched as addWatchedMovie, removeWatched as removeWatchedMovie, getWatchedDetails } from '../services/watchedMoviesServices'
import { getYears } from '../services/watchedMoviesServices'

export const useWatched = () => {
    const [watched, setWatched] = useState([])
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [ordering, setOrdering] = useState("-first_watched_date")
    const [watchedDetails, setWatchedDetails] = useState({})
    const [years, setYears] = useState([])

    const { session } = useContext(SessionContext)

    const fetchWatched = useCallback(async (page = 1, ordering, year, search = "") => {
        try {
            setLoading(true)
            const { watchedMapped, count, next, previous } = await getWatched({ access: session.access, page, ordering, year, search })
            setWatched(watchedMapped)
            setPagination({ count, next, previous })
        } catch (error) {
            setError("Error fetching watched movies")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [session.access])

    const addWatched = async (movie, payload) => {
        try {
            await addWatchedMovie({ movie, payload, access: session.access })
            setWatched([...watched, movie])
        } catch (error) {
            console.error(error)
            setError("Error adding movie to watched")
        }
    }

    const removeWatched = async (movieId) => {
        try {
            await removeWatchedMovie({ movieId: movieId, access: session.access })
            setWatched(watched.filter((watchedMovie) => watchedMovie.id !== movieId))
        } catch (error) {
            console.error(error)
            setError("Error removing movie from watched")
        }
    }

    const getWatchedMovie = useCallback(async ({ movieId }) => {
        try {
            setLoading(true)
            const watched = await getWatchedDetails({ movieId, access: session.access })
            setWatchedDetails(watched)
        } catch (error) {
            setError("Error fetching watched movie")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchYears = useCallback(async () => {
        try {
            const newYears = await getYears({ access: session.access })
            const currentYear = new Date().getFullYear()

            if (!newYears.includes(currentYear)) {
                newYears.unshift(currentYear)
            }

            setYears([{ key: "", label: "All years" }, ...newYears])
        } catch (e) {
            console.error(e)
        }
    })

    return { watched, pagination, ordering, watchedDetails, loading, error, years, addWatched, removeWatched, fetchWatched, getWatchedMovie, setOrdering, fetchYears, setWatchedDetails }
}