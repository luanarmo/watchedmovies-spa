import { useState, useRef, useCallback } from 'react'
import { searchMovies } from '../services/search.js'

export const useSearchMovies = ({ query }) => {
    // Custom hook to fetch movies based on a query

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const prevQuery = useRef(query)

    const getMovies = useCallback(async ({ query }) => {
        if (prevQuery.current === query) return

        setLoading(true)
        prevQuery.current = query
        const newMovies = await searchMovies({ query })
        setMovies(newMovies)
        setLoading(false)
    }, [])

    return { movies, getMovies, loading }
}