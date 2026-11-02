import { useContext } from 'react'
import { SesionContext } from '../context/sesion.jsx'
import { Navbar } from './Navbar'
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'


export function Base({ children }) {
    const { sesion } = useContext(SesionContext)

    return (
        <div className="flex flex-col bg-dusty-grape-950 text-dusty-grape-50">
            <Navbar />
            {/* Below lg the bottom tab bar is fixed, so the content leaves room for it */}
            <main className={`flex-grow w-full ${sesion.auth ? 'pb-24 lg:pb-0' : ''}`}>
                {children}
            </main>
            <div className={sesion.auth ? 'hidden lg:block' : ''}>
                <Footer />
            </div>
            {sesion.auth && <BottomNav />}
        </div>
    )
}
