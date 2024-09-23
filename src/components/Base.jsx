import { Navbar } from './Navbar'
import { Footer } from './Footer'


export function Base({ children }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

