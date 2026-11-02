import { Link } from 'react-router-dom'

const SECTIONS = [
    { to: '/watched', label: 'Watched' },
    { to: '/plan', label: 'To watch' },
    { to: '/tier-list', label: 'Tiers' },
]

// Segmented control to move between the diary lists; on desktop the navbar already has these links
export function DiaryTabs({ current }) {
    return (
        <div className='lg:hidden flex gap-1 p-1 rounded-2xl bg-dusty-grape-800'>
            {SECTIONS.map(({ to, label }) => {
                const active = to === current
                return (
                    <Link
                        key={to}
                        to={to}
                        aria-current={active ? 'page' : undefined}
                        className={`flex-1 flex items-center justify-center min-h-[44px] rounded-xl text-sm transition-colors ${active ? 'bg-coral text-dusty-grape-950 font-bold' : 'text-dusty-grape-100 hover:bg-dusty-grape-700'}`}
                    >
                        {label}
                    </Link>
                )
            })}
        </div>
    )
}
