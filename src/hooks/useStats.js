import { useState, useCallback, useContext } from 'react'
import { SesionContext } from '../context/sesion'
import { getStats } from '../services/statsServices'

export const useStats = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { sesion } = useContext(SesionContext)

    const fetchStats = useCallback(async (year) => {
        try {
            setLoading(true)
            const data = await getStats({ access: sesion.access, year })
            setStats(data)
        } catch (e) {
            setError('Error fetching statistics')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [sesion.access])

    return { stats, loading, error, fetchStats }
}
