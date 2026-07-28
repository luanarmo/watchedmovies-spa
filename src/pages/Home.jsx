import { HomeSearch } from '../components/HomeSearch'
import { Base } from '../components/Base'
import { Movies } from '../components/Movies'
import { MoviesSkeleton } from '../components/MoviesSkeleton.jsx'
import { useMovies } from '../hooks/useMovies'
import { useEffect } from 'react'

export default function Home() {

    const { popular, getPopularMovies, loading } = useMovies()


    useEffect(() => {
        getPopularMovies()
    }, [getPopularMovies])


    return (
        <Base>
            <HomeSearch />
            {loading ? <MoviesSkeleton /> : <Movies movies={popular} />}
        </Base>
    )
}
