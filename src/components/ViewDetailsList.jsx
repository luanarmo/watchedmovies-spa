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
        <ul className='flex flex-row gap-4 p-2 flex-wrap'>
            {viewDetails.map(viewDetail => (
                <li key={viewDetail.id} className='bg-dusty-grape-800 p-4 w-60 rounded-xl border border-dusty-grape-700 shadow-md text-dusty-grape-100 flex flex-col gap-2 relative group'>
                    <div className='flex justify-between items-start'>
                        <span className='px-2 py-1 bg-dusty-grape-700 rounded text-xs font-semibold uppercase tracking-wider'>{viewDetail.place}</span>
                        <span className='text-sm text-dusty-grape-300'>{viewDetail.watched_date}</span>
                    </div>
                    <p className='text-sm text-dusty-grape-300'>Language: <span className='text-dusty-grape-100 font-medium uppercase'>{viewDetail.language}</span></p>

                    <div className='flex items-center gap-2 mt-2'>
                        <span className='flex items-center gap-1 text-yellow-400 font-bold bg-dusty-grape-900/50 px-2 py-1 rounded'>{viewDetail.rating ? viewDetail.rating : 'N/A'} <span className='text-xs opacity-70'>/ 10</span></span>
                    </div>

                    <p className='text-sm italic text-dusty-grape-200 mt-2 bg-dusty-grape-900/30 p-2 rounded'>
                        {viewDetail.comment ? truncateText(viewDetail.comment, MAX_COMMENT_LENGTH) : <span className='flex items-center gap-1 text-dusty-grape-500'><BiCommentX /> No comment</span>}
                    </p>

                    <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                            className='text-red-400 hover:text-red-300 transition-colors bg-dusty-grape-900/80 p-1.5 rounded-full hover:bg-dusty-grape-900'
                            onClick={() => removeViewDetails(viewDetail.id)}
                        >
                            <FaTrash title='Remove viewed movie' size={14} />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
