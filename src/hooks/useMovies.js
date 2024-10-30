import { useCallback, useState } from 'react'
import { popularMovies } from '../services/popular.js'

export const useMovies = () => {
    // Custom hook to fetch popular movies

    const [loading, setLoading] = useState(true)
    const [popular, setPopular] = useState([])


    const getPopularMovies = useCallback(async () => {
        setLoading(true)
        const newMovies = await popularMovies()
        setPopular(newMovies)
        setLoading(false)
    }, [])

    return { popular, getPopularMovies, loading }
}