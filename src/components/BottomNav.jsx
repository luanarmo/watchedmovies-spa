import { Link, useLocation } from 'react-router-dom'
import { FaSearch, FaFilm, FaChartBar, FaUser } from 'react-icons/fa'

// "Diary" groups every list of the user, so it stays active on those routes
const TABS = [
    { to: '/', label: 'Explore', icon: FaSearch, match: (path) => path === '/' || path.startsWith('/search') || path.startsWith('/movie/') },
    { to: '/watched', label: 'Diary', icon: FaFilm, match: (path) => ['/watched', '/plan', '/tier-list', '/watchedDetails'].some(prefix => path.startsWith(prefix)) },
    { to: '/stats', label: 'Stats', icon: FaChartBar, match: (path) => path.startsWith('/stats') },
    { to: '/profile', label: 'Profile', icon: FaUser, match: (path) => path.startsWith('/profile') },
]

export function BottomNav() {
    const { pathname } = useLocation()

    return (
        <nav
            aria-label='Main'
            className='lg:hidden fixed bottom-0 inset-x-0 z-40 flex h-[72px] bg-dusty-grape-900 border-t border-dusty-grape-700 pb-[env(safe-area-inset-bottom)] box-content'
        >
            {TABS.map(({ to, label, icon: Icon, match }) => {
                const active = match(pathname)
                return (
                    <Link
                        key={to}
                        to={to}
                        aria-current={active ? 'page' : undefined}
                        className={`flex-1 flex flex-col items-center justify-center gap-1 text-xs min-h-[44px] transition-colors ${active ? 'text-coral font-bold' : 'text-dusty-grape-200 hover:text-dusty-grape-50'}`}
                    >
                        <Icon className='text-xl' aria-hidden='true' />
                        <span>{label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
