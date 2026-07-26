import { Base } from './Base.jsx'
import { SesionContext } from '../context/sesion.jsx'
import { useWatched } from '../hooks/useWatched.js'
import { WatchedMovie } from './WatchedMovie.jsx'
import { Pagination } from './Pagination.jsx'
import { OrderOption } from './OrderOption.jsx'
import { WatchedMovieSkeleton } from './watchedMovieSkeleton.jsx'
import { useEffect, useContext, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'


export default function Watched() {

    const { sesion } = useContext(SesionContext)
    const { watched, pagination, ordering, loading, years, error, removeWatched, fetchWatched, setOrdering, fetchYears } = useWatched()
    const [page, setPage] = useState(1)
    const [year, setYear] = useState(null)
    const [search, setSearch] = useState("")

    const WatchedDateOptions = [
        {
            key: "-first_watched_date", label: "Date (desc)"
        },
        {
            key: "first_watched_date", label: "Date (asc)"
        }
    ]

    const navigate = useNavigate()

    const debouncedSearch = useMemo(() =>
        debounce((value, currentOrdering, currentYear) => {
            setPage(1)
            fetchWatched(1, currentOrdering, currentYear, value)
        }, 600),
    [fetchWatched])

    const handlePage = (newPage) => {
        setPage(newPage)
        fetchWatched(newPage, ordering, year, search)
    }

    const handleOrderChange = (option) => {
        setOrdering(option)
        fetchWatched(page, option, year, search)
    }

    const handleFilterChange = (option) => {
        setYear(option)
        setPage(1)
        fetchWatched(1, ordering, option, search)
    }

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearch(value)
        debouncedSearch(value, ordering, year)
    }


    useEffect(() => {
        const isExpired = () => {
            return sesion.expiresAt ? Date.now() > sesion.expiresAt : true;
        }

        if (isExpired()) {
            sesion.auth = false
            navigate('/login')
        }
        const current_year = new Date().getFullYear()
        setYear(current_year)
        fetchWatched(page, ordering, current_year)
        fetchYears()
    }, [])

    if (error) {
        return <div className='text-white'>{error}</div>
    }

    return (
        <Base>
            <div className=' mx-auto flex flex-col gap-6 p-4 w-full min-h-screen'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 bg-dusty-grape-800/50 p-4 rounded-xl border border-dusty-grape-700 backdrop-blur-sm'>
                    <h2 className='text-2xl font-bold text-dusty-grape-100'>Watched Movies</h2>
                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <label className="text-dusty-grape-300 font-medium">Search:</label>
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Search a movie..."
                                className="px-4 py-2 rounded-full text-dusty-grape-50 bg-dusty-grape-700 border border-dusty-grape-700 hover:bg-dusty-grape-600 transition-colors focus:outline-none focus:ring-2 focus:ring-dusty-grape-500 placeholder-dusty-grape-400"
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className="text-dusty-grape-300 font-medium">Order by:</label>
                            <OrderOption
                                className='flex items-center justify-center'
                                options={WatchedDateOptions}
                                selectedOption={ordering}
                                handleOrderChange={handleOrderChange}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className='text-dusty-grape-300 font-medium'>Year:</label>
                            <OrderOption
                                className='flex sm:flex-col items-center justify-center'
                                options={years}
                                selectedOption={year || ''}
                                handleOrderChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>
                {loading ? (
                    <ul className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6'>
                        {Array.from({ length: 25 }).map((_, index) => <WatchedMovieSkeleton key={index} />)}
                    </ul>
                ) : (
                    watched.length === 0 && year === new Date().getFullYear() ? (
                        <div className='flex items-center justify-center p-20 border-2 border-dashed border-dusty-grape-800 rounded-xl'>
                            <p className='text-xl text-dusty-grape-400'>No watched movies recorded for this year.</p>
                        </div>
                    ) : (
                        <ul className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6'>
                            {watched.map((movie) => (
                                <WatchedMovie
                                    key={movie.id}
                                    movie={movie}
                                    onDelete={removeWatched}
                                    redirect={'watchedDetails'}
                                />
                            ))}
                        </ul>
                    )
                )
                }
                <div className='flex items-center justify-center mt-8'>
                    <Pagination page={page} pagination={pagination} handlePage={handlePage} />
                </div>
            </div>
        </Base>
    )
}
