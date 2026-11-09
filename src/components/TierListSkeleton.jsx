import { TIERS, TIER_BG } from '../utils/tiers.js'

// Posters per row, so the rows differ in length like a real list does
const POSTERS_PER_TIER = { 5: 3, 4: 5, 3: 4, 2: 2, 1: 1 }

// Mirrors TierListTable (same table, letter cell and min-h-24 row), so nothing jumps when the list arrives
export function TierListSkeleton() {
    return (
        <div role='status' aria-busy='true' aria-label='Loading tier list'>
            <table className='w-full border-separate border-spacing-y-2'>
                <tbody>
                    {TIERS.map(tier => (
                        <tr key={tier.value}>
                            {/* The letters never change, so they are shown as they are */}
                            <th scope='row' className={`w-16 md:w-20 rounded-l-xl ${TIER_BG[tier.value]} text-dusty-grape-950 text-2xl md:text-3xl font-bold`}>
                                {tier.letter}
                            </th>
                            <td className='rounded-r-xl border p-2 bg-dusty-grape-800/50 border-dusty-grape-700'>
                                <div className='flex flex-wrap gap-2 min-h-24 animate-pulse'>
                                    {Array.from({ length: POSTERS_PER_TIER[tier.value] }, (_, index) => (
                                        <div key={index} className='w-16 md:w-20 aspect-[2/3] rounded-md bg-dusty-grape-700' />
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
