import { useState, useContext, useCallback } from 'react'
import { deleteViewDetails, getAllViewDetails, patchViewDetails } from '../services/viewDetails'
import { SesionContext } from '../context/sesion.jsx'

export const useViewDetails = () => {
    const { sesion } = useContext(SesionContext)
    const [viewDetails, setViewDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updating, setUpdating] = useState(false)


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

    // Errors are rethrown so the caller can notify without replacing the list with the error state
    const editViewDetails = async (viewDetailId, payload) => {
        setUpdating(true)
        try {
            const updated = await patchViewDetails({ id: viewDetailId, payload, access: sesion.access })
            setViewDetails(current => current.map(viewDetail => viewDetail.id === viewDetailId ? updated : viewDetail))
            return updated
        } finally {
            setUpdating(false)
        }
    }

    return { viewDetails, loading, error, updating, fetchViewDetails, removeViewDetails, editViewDetails }


}