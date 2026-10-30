import { useState, useCallback, useContext, useRef } from 'react'
import { SesionContext } from '../context/sesion'
import { getTierList, setMovieTier } from '../services/watchedMoviesServices'

export const useTierList = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { sesion } = useContext(SesionContext)
    const lastRequest = useRef(0)

    const fetchTierList = useCallback(async (year) => {
        // Only the last request counts: an earlier one that answers later must not overwrite the list
        const request = ++lastRequest.current
        try {
            setLoading(true)
            setError(null)
            const data = await getTierList({ access: sesion.access, year })
            if (request === lastRequest.current) setMovies(data)
        } catch (e) {
            if (request === lastRequest.current) setError('Error fetching tier list')
            console.error(e)
        } finally {
            if (request === lastRequest.current) setLoading(false)
        }
    }, [sesion.access])

    const changeTier = (movieId, tier) => {
        setMovies(current => current.map(movie => movie.id === movieId ? { ...movie, tier } : movie))
    }

    // Moves the poster right away and puts it back in its tier if the API rejects the change
    const moveMovie = useCallback(async (movieId, tier) => {
        const previousTier = movies.find(movie => movie.id === movieId)?.tier
        changeTier(movieId, tier)
        try {
            await setMovieTier({ access: sesion.access, movieId, tier })
        } catch (e) {
            changeTier(movieId, previousTier)
            throw e
        }
    }, [movies, sesion.access])

    return { movies, loading, error, fetchTierList, moveMovie }
}
