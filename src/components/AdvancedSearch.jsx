import { Search } from './Search.jsx'
import { Base } from './Base'
import { Movies } from './Movies'
import { MoviesSkeleton } from './MoviesSkeleton.jsx'
import { Pagination } from './Pagination.jsx'
import { useState, useContext, useEffect, useCallback } from 'react'
import { SearchContext } from '../context/search.jsx'
import { searchMovies } from '../services/search.js'
import debounce from 'just-debounce-it'

export default function AdvancedSearch() {
    const { search, setSearch } = useContext(SearchContext)

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchMovies = useCallback(async (query, currentPage) => {
        if (query === '') {
            setMovies([])
            return
        }
        setLoading(true)
        const result = await searchMovies({ query, page: currentPage })
        if (result) {
            setMovies(result.movies)
            setTotalPages(result.totalPages)
        }
        setLoading(false)
    }, [])

    const debouncedFetch = useCallback(debounce((query) => fetchMovies(query, 1), 600), [])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies(search, page)
    }

    const handleChange = (e) => {
        const newSearch = e.target.value
        setSearch(newSearch)
        setPage(1)
        debouncedFetch(newSearch)
    }

    const handlePage = (newPage) => {
        setPage(newPage)
        fetchMovies(search, newPage)
    }

    useEffect(() => {
        if (search) fetchMovies(search, 1)
    }, [])

    useEffect(() => {
        if (search === '') {
            setMovies([])
            setLoading(false)
            setPage(1)
            setTotalPages(1)
        }
    }, [search])

    const pagination = {
        next: page < totalPages ? true : null,
        previous: page > 1 ? true : null,
    }

    return (
        <div className="items-center text-white bg-slate-950">
            <Base>
                <Search
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    search={search}
                />
                {loading
                    ? <MoviesSkeleton />
                    : (
                        <>
                            <Movies movies={movies} />
                            {totalPages > 1 && (
                                <Pagination page={page} pagination={pagination} handlePage={handlePage} />
                            )}
                        </>
                    )
                }
            </Base>
        </div>
    )
}
