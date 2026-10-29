import { Link } from 'react-router-dom'
import { TIERS } from '../utils/tiers.js'

const POSTER_PLACEHOLDER = 'https://placehold.co/500x750?font=roboto'

export function TierListTable({ movies }) {
    if (movies.length === 0) {
        return <p className='text-center text-dusty-grape-400 py-10'>No movies with a tier yet.</p>
    }

    return (
        <table className='w-full border-separate border-spacing-y-2'>
            <tbody>
                {TIERS.map(({ value, letter }) => (
                    <tr key={value}>
                        <th scope='row' className='w-16 md:w-20 rounded-l-xl bg-dusty-grape-500 text-white text-2xl md:text-3xl font-bold'>
                            {letter}
                        </th>
                        <td className='rounded-r-xl bg-dusty-grape-800/50 border border-dusty-grape-700 p-2'>
                            <div className='flex flex-wrap gap-2 min-h-24'>
                                {movies.filter(movie => movie.tier === value).map(movie => (
                                    <Link key={movie.id} to={`/watchedDetails/${movie.id}`} className='hover:scale-105 transition-transform'>
                                        <img
                                            src={movie.poster_url || POSTER_PLACEHOLDER}
                                            alt={movie.title}
                                            title={movie.title}
                                            className='w-16 md:w-20 aspect-[2/3] object-cover rounded-md shadow-md'
                                        />
                                    </Link>
                                ))}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
