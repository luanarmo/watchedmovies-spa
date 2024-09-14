import { useCallback, useState } from 'react'
import { popularMovies } from '../services/popular.js'

export const useMovies = () => {
    // Custom hook to fetch popular movies

    const [popular, setPopular] = useState([])


    const getPopularMovies = useCallback(async () => {
        const newMovies = await popularMovies()
        setPopular(newMovies)
    }, [])

    return { popular, getPopularMovies }
}