import { Base } from '../components/Base.jsx'
import { SessionContext } from '../context/session.jsx'
import { usePlan } from '../hooks/usePlan.js'
import { WatchedMovie } from '../components/WatchedMovie.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { WatchedMovieSkeleton } from '../components/WatchedMovieSkeleton.jsx'
import { DiaryTabs } from '../components/DiaryTabs.jsx'
import { AddMovieFab } from '../components/AddMovieFab.jsx'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function PlanList() {

    const { session, deleteExpiredSession } = useContext(SessionContext)
    const { plan, loading, error, pagination, fetchPlan, removePlan } = usePlan()
    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    const handlePage = (newPage) => {
        setPage(newPage)
        fetchPlan(newPage)
    }

    useEffect(() => {
        const isExpired = () => {
            return session.expiresAt ? Date.now() > session.expiresAt : true;
        }

        if (isExpired()) {
            deleteExpiredSession()
            navigate('/login')
        }
        fetchPlan(page)
    }, [])

    if (error) {
        return <div className='text-white'>{error}</div>
    }

    return (
        <Base>
            <div className='mx-auto flex flex-col gap-4 md:gap-6 p-4 w-full min-h-screen'>
                <DiaryTabs current='/plan' />
                <div className='md:bg-dusty-grape-800/50 md:p-4 md:rounded-xl md:border md:border-dusty-grape-700 md:backdrop-blur-sm md:mb-4'>
                    <h2 className='text-2xl font-bold text-dusty-grape-100'>Plan to Watch</h2>
                </div>
                {loading ? (
                    <ul className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 md:gap-6'>
                        {Array.from({ length: 25 }).map((_, index) => <WatchedMovieSkeleton key={index} />)}
                    </ul>
                ) : (
                    <ul className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 md:gap-6'>
                        {plan.map((movie) => (
                            <WatchedMovie
                                key={movie.id}
                                movie={movie}
                                onDelete={removePlan}
                                redirect={'movie'}
                                showWatchedFields={false}
                            />
                        ))}
                    </ul>
                )
                }
                <div className='flex items-center justify-center mt-8'>
                    <Pagination page={page} pagination={pagination} handlePage={handlePage} />
                </div>
            </div>
            <AddMovieFab />
        </Base>
    )
}
