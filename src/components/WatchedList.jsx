import { Base } from './Base.jsx'
import { SesionContext } from '../context/sesion.jsx'
import { useWatched } from '../hooks/useWatched.js'
import { WatchedMovie } from './WatchedMovie.jsx'
import { Pagination } from './Pagination.jsx'
import { OrderOption } from './OrderOption.jsx'
import { WatchedMovieSkeleton } from './watchedMovieSkeleton.jsx'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Watched() {

    const { sesion } = useContext(SesionContext)
    const { watched, pagination, ordering, loading, years, error, removeWatched, fetchWatched, setOrdering, fetchYears } = useWatched()
    const [page, setPage] = useState(1)
    const [year, setYear] = useState(null)

    const WatchedDateOptions = [
        {
            key: "-first_watched_date", label: "Date (desc)"
        },
        {
            key: "first_watched_date", label: "Date (asc)"
        }
    ]

    const navigate = useNavigate()

    const handlePage = (newPage) => {
        setPage(newPage)
        fetchWatched(newPage, ordering, year)
    }

    const handleOrderChange = (option) => {
        setOrdering(option)
        fetchWatched(page, option, year)
    }

    const handleFilterChange = (option) => {
        setYear(option)
        fetchWatched(page, ordering, option)
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
            <div className='flex flex-col gap-2 p-2 bg-slate-950 text-white h-screen overflow-y-auto max-h-[calc(100vh-8rem)]'>
                <div className='flex items-center justify-center gap-2'>
                    <div className='flex flex-col items-center justify-center lg:flex-row gap-2'>
                        <label className="text-white px-4">Order by:</label>
                        <OrderOption
                            className='flex items-center justify-center'
                            options={WatchedDateOptions}
                            selectedOption={ordering}
                            handleOrderChange={handleOrderChange}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center lg:flex-row gap-2'>
                        <label className='text-white px-4'>Filter by:</label>
                        <OrderOption
                            className='flex sm:flex-col items-center justify-center'
                            options={years}
                            selectedOption={year || ''}
                            suffix={'Year'}
                            handleOrderChange={handleFilterChange}
                        />
                    </div>
                </div>
                {loading ? (
                    <ul className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4 bg-slate-950'>
                        {Array.from({ length: 25 }).map((_, index) => <WatchedMovieSkeleton key={index} />)}
                    </ul>
                ) : (
                    <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4 bg-slate-950'>
                        {watched.map((movie) => (
                            <WatchedMovie
                                key={movie.id}
                                movie={movie}
                                onDelete={removeWatched}
                            />
                        ))}
                    </ul>
                )
                }
                <div className='flex items-center justify-center'>
                    <Pagination page={page} pagination={pagination} handlePage={handlePage} />
                </div>
            </div>
        </Base>
    )
}
