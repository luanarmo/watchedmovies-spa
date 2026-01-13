import { Base } from './Base.jsx'
import { SesionContext } from '../context/sesion.jsx'
import { usePlan } from '../hooks/usePlan.js'
import { WatchedMovie } from './WatchedMovie.jsx'
import { Pagination } from './Pagination.jsx'
import { WatchedMovieSkeleton } from './watchedMovieSkeleton.jsx'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function PlanList() {

    const { sesion } = useContext(SesionContext)
    const { plan, loading, error, pagination, fetchPlan, removePlan } = usePlan()
    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    const handlePage = (newPage) => {
        setPage(newPage)
        fetchPlan(newPage)
    }

    useEffect(() => {
        const isExpired = () => {
            return sesion.expiresAt ? Date.now() > sesion.expiresAt : true;
        }

        if (isExpired()) {
            sesion.auth = false
            navigate('/login')
        }
        fetchPlan(page)
    }, [])

    if (error) {
        return <div className='text-white'>{error}</div>
    }

    return (
        <Base>
            <div className='container mx-auto flex flex-col gap-6 p-4 w-full'>
                <div className='bg-dusty-grape-800/50 p-4 rounded-xl border border-dusty-grape-700 backdrop-blur-sm mb-4'>
                    <h2 className='text-2xl font-bold text-dusty-grape-100 text-center md:text-left'>Plan to Watch</h2>
                </div>
                {loading ? (
                    <ul className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6'>
                        {Array.from({ length: 25 }).map((_, index) => <WatchedMovieSkeleton key={index} />)}
                    </ul>
                ) : (
                    <ul className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6'>
                        {plan.map((movie) => (
                            <WatchedMovie
                                key={movie.id}
                                movie={movie}
                                onDelete={removePlan}
                                redirect={'movie'}
                            />
                        ))}
                    </ul>
                )
                }
                <div className='flex items-center justify-center mt-8'>
                    <Pagination page={page} pagination={pagination} handlePage={handlePage} />
                </div>
            </div>
        </Base>
    )
}
