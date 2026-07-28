import { useCallback, useState } from 'react'
import { popularMovies } from '../services/popular.js'

export const useMovies = () => {
    const [loading, setLoading] = useState(true)
    const [popular, setPopular] = useState([])
    const [error, setError] = useState(null)

    const getPopularMovies = useCallback(async () => {
        try {
            setLoading(true)
            const newMovies = await popularMovies()
            setPopular(newMovies)
        } catch (e) {
            setError('Error fetching popular movies')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [])

    return { popular, getPopularMovies, loading, error }
}