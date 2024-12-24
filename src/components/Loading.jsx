import { FaSpinner } from 'react-icons/fa';

export function Loading() {
    return (
        <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-4xl text-white" />
        </div>
    )
}