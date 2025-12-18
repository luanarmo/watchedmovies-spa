import { useEffect } from 'react';
import { BiCommentX } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa6";
import { FaTrash } from 'react-icons/fa';
import { truncateText } from '../utils/truncateText'
import { useViewDetails } from '../hooks/useViewDetails'


export default function ViewDetailsList({ movieId }) {

    const { viewDetails, loading, error, fetchViewDetails, removeViewDetails } = useViewDetails()

    useEffect(
        () => {
            fetchViewDetails(movieId)
        }, []
    )

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
                    <p>{viewDetail.watched_date}</p>
                    <p>{viewDetail.comment ? truncateText(viewDetail.comment, MAX_COMMENT_LENGTH) : <BiCommentX />}</p>
                    <p>{viewDetail.rating ? viewDetail.rating : <FaRegChartBar />}</p>
                    <div className='flex mt-2'>
                        <button
                            className='text-red-500 hover:text-red-600'
                            onClick={() => removeViewDetails(viewDetail.id)}
                        >
                            <FaTrash title='Remove viewed movie' />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
