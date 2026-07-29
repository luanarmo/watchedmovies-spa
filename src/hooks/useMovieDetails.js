import { useState, useCallback } from 'react'
import { movieDetails } from '../services/details.js'

export const useMovieDetails = () => {
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getMovieDetails = useCallback(async ({ movieId, token }) => {
        try {
            setLoading(true)
            const newMovie = await movieDetails({ movieId, token })
            setMovie(newMovie)
        } catch (e) {
            setError('Error fetching movie details')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [])

    return { movie, getMovieDetails, loading, error }
}