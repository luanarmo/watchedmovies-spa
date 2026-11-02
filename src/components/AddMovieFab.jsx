import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

// Floating shortcut to the search, where movies are added; sits above the bottom tab bar
export function AddMovieFab() {
    return (
        <Link
            to='/'
            aria-label='Add a movie'
            className='lg:hidden fixed right-5 bottom-24 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-coral text-dusty-grape-950 shadow-lg shadow-black/40 hover:brightness-110 transition'
        >
            <FaPlus className='text-xl' aria-hidden='true' />
        </Link>
    )
}
