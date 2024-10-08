import { Search } from './Search.jsx'
import { Base } from './Base'
import { Movies } from './Movies'
import { useState, useContext, useEffect, useCallback, useRef } from 'react'
import { SearchContext } from '../context/search.jsx'
import { searchMovies } from '../services/search.js'
import debounce from 'just-debounce-it'

export default function AdvancedSearch() {

    const { search, setSearch } = useContext(SearchContext)

    const prevSearch = useRef('')

    const [movies, setMovies] = useState([])


    const getSearchedMovies = useCallback(async ({ search }) => {

        if (prevSearch.current === search) return

        const movies = await searchMovies({ query: search })
        setMovies(movies)

        prevSearch.current = search

    }, [])

    const debouncedGetSearchedMovies = useCallback(debounce(search => getSearchedMovies({ search }), 600), [])


    const handleSubmit = (e) => {
        e.preventDefault()
        getSearchedMovies({ search })
    }

    const handleChange = (e) => {
        const newSearch = e.target.value
        setSearch(newSearch)
        debouncedGetSearchedMovies(newSearch)
    }

    useEffect(() => {
        getSearchedMovies({ search })
    }, [])

    useEffect(() => {
        if (search === '') {
            setMovies([])
        }

    }, [search])

    return (
        <div className="items-center text-white bg-slate-950">
            <Base>
                <Search
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    search={search}
                />
                <Movies movies={movies} />
            </Base>
        </div>
    )
}
