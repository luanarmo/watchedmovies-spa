import { useState, useEffect, useContext, useCallback } from 'react';
import { SesionContext } from '../context/sesion'
import { getAllViewDetails } from '../services/viewDetails'
import { BiCommentX } from "react-icons/bi";
import { LuGanttChartSquare } from "react-icons/lu";
import { truncateText } from '../utils/truncateText'

export default function ViewDetailsList({ movieId }) {

    const { sesion } = useContext(SesionContext)
    const [viewDetails, setViewDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const fetchViewDetails = useCallback(async () => {
        try {
            const viewDetails = await getAllViewDetails({ access: sesion.access, watchedId: movieId })
            setViewDetails(viewDetails)
        } catch (error) {
            setError("Error fetching view details")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchViewDetails()
    }, [])

    const MAX_COMMENT_LENGTH = 70;




    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }


    return (
        <ul className='flex flex-row gap-2 p-2'>
            {viewDetails.map(viewDetail => (
                <li key={viewDetail.id} className='bg-slate-600 p-4 w-60 rounded-lg'>
                    <p>{viewDetail.place}</p>
                    <p>{viewDetail.language}</p>
                    <p>{viewDetail.watched_at}</p>
                    <p>{viewDetail.comment ? truncateText(viewDetail.comment, MAX_COMMENT_LENGTH) : <BiCommentX />}</p>
                    <p>{viewDetail.rating ? viewDetail.rating : <LuGanttChartSquare />}</p>
                </li>
            ))}
        </ul>
    )
}
