const TIER_LETTERS = { 5: 'S', 4: 'A', 3: 'B', 2: 'C', 1: 'D' }

export function TierBadge({ tier }) {
    if (!tier) {
        return null
    }

    return (
        <span className='flex items-center justify-center w-10 h-10 rounded-full bg-dusty-grape-500 text-white text-lg font-bold shadow-md'>
            {TIER_LETTERS[tier]}
        </span>
    )
}
