import { useState, useCallback, useContext } from 'react'
import { SesionContext } from '../context/sesion'
import { getTierList } from '../services/watchedMoviesServices'

export const useTierList = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { sesion } = useContext(SesionContext)

    const fetchTierList = useCallback(async (year) => {
        try {
            setLoading(true)
            const data = await getTierList({ access: sesion.access, year })
            setMovies(data)
        } catch (e) {
            setError('Error fetching tier list')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [sesion.access])

    return { movies, loading, error, fetchTierList }
}
