import { getTierLetter, TIER_BG } from '../utils/tiers.js'

// `compact` is the small rounded square used in the list rows
export function TierBadge({ tier, compact = false }) {
    if (!tier) {
        return null
    }

    if (compact) {
        return (
            <span className={`flex items-center justify-center w-10 h-10 rounded-[10px] text-dusty-grape-950 text-lg font-bold ${TIER_BG[tier] ?? 'bg-dusty-grape-200'}`}>
                {getTierLetter(tier)}
            </span>
        )
    }

    return (
        <span className='flex items-center justify-center w-10 h-10 rounded-full bg-dusty-grape-500 text-white text-lg font-bold shadow-md'>
            {getTierLetter(tier)}
        </span>
    )
}
