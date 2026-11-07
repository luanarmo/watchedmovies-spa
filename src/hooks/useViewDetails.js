import { useState, useContext, useCallback } from 'react'
import { deleteViewDetails, getAllViewDetails, patchViewDetails } from '../services/viewDetails'
import { SessionContext } from '../context/session.jsx'

export const useViewDetails = () => {
    const { session } = useContext(SessionContext)
    const [viewDetails, setViewDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updating, setUpdating] = useState(false)


    const fetchViewDetails = useCallback(async (movieId) => {
        try {
            const viewDetails = await getAllViewDetails({ access: session.access, watchedId: movieId })
            setViewDetails(viewDetails)
        } catch (error) {
            setError("Error fetching view details")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [session.access])

    const removeViewDetails = async (viewDetailId) => {
        try {
            await deleteViewDetails({ viewDetailsId: viewDetailId, access: session.access })
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
            const updated = await patchViewDetails({ id: viewDetailId, payload, access: session.access })
            setViewDetails(current => current.map(viewDetail => viewDetail.id === viewDetailId ? updated : viewDetail))
            return updated
        } finally {
            setUpdating(false)
        }
    }

    return { viewDetails, loading, error, updating, fetchViewDetails, removeViewDetails, editViewDetails }


}