import { SesionContext } from '../context/sesion'
import { useState, useCallback, useContext } from 'react'
import { getAllPlanMovies, addPlanMovie, retrievePlanMovie, removePlanMovie } from '../services/planMovieServices'

export const usePlan = () => {
    const [plan, setPlan] = useState([])
    const [planDetails, setPlanDetails] = useState({})
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { sesion } = useContext(SesionContext)

    const fetchPlan = useCallback(async (page = 1) => {
        try {
            setLoading(true)
            const { planMovies, count, next, previous } = await getAllPlanMovies({ access: sesion.access, page })
            setPlan(planMovies)
            setPagination({ count, next, previous })
        } catch (error) {
            setError("Error fetching plan movies")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [sesion.access])

    const addPlan = async (movie) => {
        try {
            await addPlanMovie({ movie, access: sesion.access })
            setPlan([...plan, movie])
        } catch (error) {
            console.error(error)
            setError("Error adding movie to plan")
        }
    }

    const getPlan = useCallback(async ({ movieId }) => {
        try {
            setLoading(true)
            const plan = await retrievePlanMovie({ id: movieId, access: sesion.access })
            setPlanDetails(plan)
            setLoading(false)
        } catch (error) {
            setError("Error fetching plan movie")
            console.error(error)
        }
    }, [])

    const removePlan = async (movieId) => {
        try {
            await removePlanMovie({ movieId: movieId, access: sesion.access })
            setPlan(plan.filter((planMovie) => planMovie.id !== movieId))
        } catch (error) {
            console.error(error)
            setError("Error removing movie from plan")
        }
    }



    return { plan, loading, error, pagination, planDetails, fetchPlan, addPlan, getPlan, removePlan }
}   