import { Navbar } from './Navbar'
import { Search } from './Search'
import { Footer } from './Footer'
import { Movies } from './Movies'
import { useMovies } from '../hooks/useMovies'
import { useEffect } from 'react'

export default function Home() {

    const { popular, getPopularMovies } = useMovies()


    useEffect(() => {
        getPopularMovies()
    }, [])


    return (
        <div className="App items-center  h-screen w-screen">
            <Navbar />
            <Search />
            <Movies movies={popular} />
            <Footer />
        </div>
    )
}
