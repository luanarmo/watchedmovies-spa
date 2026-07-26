import { FaFire } from 'react-icons/fa'

export const StreakCard = ({ streak }) => {
    const { days, start_date, end_date } = streak || {}

    const formatDate = (iso) => {
        if (!iso) return null
        return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const range = start_date && end_date ? `${formatDate(start_date)} – ${formatDate(end_date)}` : null

    return (
        <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <span className='text-dusty-grape-300 text-sm font-medium uppercase tracking-wider'>Longest Streak</span>
                <FaFire className='text-orange-400 text-xl' />
            </div>
            <p className='text-dusty-grape-50 text-3xl font-bold'>{days ?? 0} <span className='text-lg font-normal text-dusty-grape-300'>days</span></p>
            {range && <p className='text-dusty-grape-400 text-sm'>{range}</p>}
        </div>
    )
}
