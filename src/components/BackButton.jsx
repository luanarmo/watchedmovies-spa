import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

// Floats over the backdrop on phones, where the navbar (and its way back) is gone
export function BackButton() {
    const navigate = useNavigate()

    return (
        <button
            type='button'
            aria-label='Back'
            onClick={() => navigate(-1)}
            className='lg:hidden absolute top-4 left-5 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-dusty-grape-950/65 text-dusty-grape-50'
        >
            <FaChevronLeft aria-hidden='true' />
        </button>
    )
}
