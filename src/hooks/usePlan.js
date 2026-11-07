import { SessionContext } from '../context/session'
import { useState, useCallback, useContext } from 'react'
import { getAllPlanMovies, addPlanMovie, removePlanMovie } from '../services/planMovieServices'

export const usePlan = () => {
    const [plan, setPlan] = useState([])
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { session } = useContext(SessionContext)

    const fetchPlan = useCallback(async (page = 1) => {
        try {
            setLoading(true)
            const { planMovies, count, next, previous } = await getAllPlanMovies({ access: session.access, page })
            setPlan(planMovies)
            setPagination({ count, next, previous })
        } catch (error) {
            setError("Error fetching plan movies")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [session.access])

    const addPlan = async (movie) => {
        try {
            await addPlanMovie({ movie, access: session.access })
            setPlan([...plan, movie])
        } catch (error) {
            console.error(error)
            setError("Error adding movie to plan")
        }
    }

    const removePlan = async (movieId) => {
        try {
            await removePlanMovie({ movieId: movieId, access: session.access })
            setPlan(plan.filter((planMovie) => planMovie.id !== movieId))
        } catch (error) {
            console.error(error)
            setError("Error removing movie from plan")
        }
    }



    return { plan, loading, error, pagination, fetchPlan, addPlan, removePlan }
}   