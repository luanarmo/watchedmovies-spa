import { HomeSearch } from './HomeSearch'
import { Base } from './Base'
import { Movies } from './Movies'
import { useMovies } from '../hooks/useMovies'
import { useEffect } from 'react'

export default function Home() {

    const { popular, getPopularMovies } = useMovies()


    useEffect(() => {
        getPopularMovies()
    }, [])


    return (
        <div className="h-screen">
            <Base>
                <HomeSearch />
                <Movies movies={popular} />
            </Base>
        </div>
    )
}
