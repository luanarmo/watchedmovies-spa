import { getTierLetter } from '../utils/tiers.js'

export function TierBadge({ tier }) {
    if (!tier) {
        return null
    }

    return (
        <span className='flex items-center justify-center w-10 h-10 rounded-full bg-dusty-grape-500 text-white text-lg font-bold shadow-md'>
            {getTierLetter(tier)}
        </span>
    )
}
