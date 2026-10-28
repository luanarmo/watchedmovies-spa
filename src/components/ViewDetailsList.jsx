import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { useViewDetails } from '../hooks/useViewDetails'
import { Modal } from './Modal.jsx'
import { ViewDetailsForm } from './ViewDetailsForm.jsx'
import { ViewDetailCard } from './ViewDetailCard.jsx'


export default function ViewDetailsList({ movieId, movie, onTierChange }) {

    const { viewDetails, loading, error, fetchViewDetails, removeViewDetails, editViewDetails } = useViewDetails()
    const [editing, setEditing] = useState(null)

    const handleEdit = async ({ payload }) => {
        try {
            await editViewDetails(editing.id, payload)
            onTierChange(payload.tier)
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
                <ViewDetailCard
                    key={viewDetail.id}
                    viewDetail={viewDetail}
                    onEdit={setEditing}
                    onDelete={removeViewDetails}
                />
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
