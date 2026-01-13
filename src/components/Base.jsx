import { Navbar } from './Navbar'
import { Footer } from './Footer'


export function Base({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-dusty-grape-950 text-dusty-grape-50">
            <Navbar />
            <main className="flex-grow w-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}

