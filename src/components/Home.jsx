import { HomeSearch } from './HomeSearch'
import { Base } from './Base'
import { Movies } from './Movies'
import { MoviesSkeleton } from './movieSkeleton'
import { useMovies } from '../hooks/useMovies'
import { useEffect } from 'react'

export default function Home() {

    const { popular, getPopularMovies, loading } = useMovies()


    useEffect(() => {
        getPopularMovies()
    }, [getPopularMovies])


    return (
        <div className="h-screen">
            <Base>
                <HomeSearch />
                {loading ? <MoviesSkeleton /> : <Movies movies={popular} />}
            </Base>
        </div>
    )
}
