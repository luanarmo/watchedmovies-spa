import { useState, useContext, useCallback } from 'react'
import { deleteViewDetails, getAllViewDetails } from '../services/viewDetails'
import { SesionContext } from '../context/sesion.jsx'

export const useViewDetails = () => {
    const { sesion } = useContext(SesionContext)
    const [viewDetails, setViewDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const fetchViewDetails = useCallback(async (movieId) => {
        try {
            const viewDetails = await getAllViewDetails({ access: sesion.access, watchedId: movieId })
            setViewDetails(viewDetails)
        } catch (error) {
            setError("Error fetching view details")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [sesion.access])

    const removeViewDetails = async (viewDetailId) => {
        try {
            await deleteViewDetails({ viewDetailsId: viewDetailId, access: sesion.access })
            setViewDetails(viewDetails.filter(viewDetail => viewDetail.id !== viewDetailId))
        } catch (error) {
            setError("Error deleting view details")
            console.error(error)
        }
    }

    return { viewDetails, loading, error, fetchViewDetails, removeViewDetails }


}