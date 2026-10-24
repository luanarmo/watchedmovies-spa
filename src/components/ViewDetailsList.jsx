import { useEffect, useState } from 'react';
import { BiCommentX } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa6";
import { FaTrash, FaHeart, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify'
import { truncateText } from '../utils/truncateText'
import { useViewDetails } from '../hooks/useViewDetails'
import { Modal } from './Modal.jsx'
import { ViewDetailsForm } from './ViewDetailsForm.jsx'


export default function ViewDetailsList({ movieId, movie }) {

    const { viewDetails, loading, error, fetchViewDetails, removeViewDetails, editViewDetails } = useViewDetails()
    const [editing, setEditing] = useState(null)

    const handleEdit = async ({ payload }) => {
        try {
            await editViewDetails(editing.id, payload)
            toast.success('View updated successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }

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
        <>
        <ul className='flex flex-row gap-4 p-2 flex-wrap'>
            {viewDetails.map(viewDetail => (
                <li key={viewDetail.id} className='bg-dusty-grape-800 p-4 w-60 rounded-xl border border-dusty-grape-700 shadow-md text-dusty-grape-100 flex flex-col gap-2 relative group'>
                    <div className='flex justify-between items-start'>
                        <span className='px-2 py-1 bg-dusty-grape-700 rounded text-xs font-semibold uppercase tracking-wider'>{viewDetail.place}</span>
                        <div className='flex items-center gap-2'>
                            {viewDetail.is_favorite && <FaHeart className='text-red-400' title='Favorite' size={12} />}
                            <span className='text-sm text-dusty-grape-300'>{viewDetail.watched_date}</span>
                        </div>
                    </div>
                    <p className='text-sm text-dusty-grape-300'>Language: <span className='text-dusty-grape-100 font-medium uppercase'>{viewDetail.language}</span></p>

                    <div className='flex items-center gap-2 mt-2'>
                        <span className='flex items-center gap-1 text-yellow-400 font-bold bg-dusty-grape-900/50 px-2 py-1 rounded'>{viewDetail.rating ? viewDetail.rating : 'N/A'} <span className='text-xs opacity-70'>/ 10</span></span>
                    </div>

                    <p className='text-sm italic text-dusty-grape-200 mt-2 bg-dusty-grape-900/30 p-2 rounded'>
                        {viewDetail.comment ? truncateText(viewDetail.comment, MAX_COMMENT_LENGTH) : <span className='flex items-center gap-1 text-dusty-grape-500'><BiCommentX /> No comment</span>}
                    </p>

                    <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                            className='text-dusty-grape-200 hover:text-dusty-grape-100 transition-colors bg-dusty-grape-900/80 p-1.5 rounded-full hover:bg-dusty-grape-900'
                            onClick={() => setEditing(viewDetail)}
                        >
                            <FaPen title='Edit view' size={14} />
                        </button>
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
        {editing && (
            <Modal isOpen onClose={() => setEditing(null)}>
                <ViewDetailsForm
                    movie={movie}
                    initialValues={editing}
                    onSubmit={handleEdit}
                    onClose={() => setEditing(null)}
                />
            </Modal>
        )}
        </>
    )
}
