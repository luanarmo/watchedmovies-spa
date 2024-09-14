import { useState } from 'react'
import { movieDetails } from '../services/details.js'

export const useMovieDetails = () => {
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)

    const getMovieDetails = async ({ movieId }) => {
        const newMovie = await movieDetails({ movieId })
        setMovie(newMovie)
        setLoading(false)
    }

    return { movie, getMovieDetails, loading }
}