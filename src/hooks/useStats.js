import { useState, useCallback, useContext } from 'react'
import { SessionContext } from '../context/session'
import { getStats } from '../services/statsServices'

export const useStats = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { session } = useContext(SessionContext)

    const fetchStats = useCallback(async (year) => {
        try {
            setLoading(true)
            const data = await getStats({ access: session.access, year })
            setStats(data)
        } catch (e) {
            setError('Error fetching statistics')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [session.access])

    return { stats, loading, error, fetchStats }
}
