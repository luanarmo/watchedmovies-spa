import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFilm, FaStar, FaLayerGroup } from 'react-icons/fa'
import { SesionContext } from '../context/sesion.jsx'
import { useStats } from '../hooks/useStats.js'
import { useWatched } from '../hooks/useWatched.js'
import { Base } from './Base.jsx'
import { OrderOption } from './OrderOption.jsx'
import { StatCard } from './stats/StatCard.jsx'
import { StreakCard } from './stats/StreakCard.jsx'
import { RuntimeCard } from './stats/RuntimeCard.jsx'
import { YearlyOverview } from './stats/YearlyOverview.jsx'
import { GenreChart } from './stats/GenreChart.jsx'
import { RatingDistribution } from './stats/RatingDistribution.jsx'
import { MonthlyActivity } from './stats/MonthlyActivity.jsx'
import { LanguageChart } from './stats/LanguageChart.jsx'
import { PlaceChart } from './stats/PlaceChart.jsx'
import { DayOfWeekChart } from './stats/DayOfWeekChart.jsx'
import { StatsSkeleton } from './stats/StatsSkeleton.jsx'

export default function Stats() {
    const { sesion } = useContext(SesionContext)
    const navigate = useNavigate()

    const { stats, loading, error, fetchStats } = useStats()
    const { years, fetchYears } = useWatched()

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    useEffect(() => {
        const isExpired = () => sesion.expiresAt ? Date.now() > sesion.expiresAt : true
        if (isExpired()) {
            sesion.auth = false
            navigate('/login')
            return
        }
        fetchYears()
        fetchStats(selectedYear)
    }, [])

    const handleYearChange = (year) => {
        const parsed = parseInt(year, 10)
        setSelectedYear(parsed)
        fetchStats(parsed)
    }

    if (error) {
        return (
            <Base>
                <div className='flex items-center justify-center min-h-screen'>
                    <p className='text-dusty-grape-400'>{error}</p>
                </div>
            </Base>
        )
    }

    return (
        <Base>
            <div className='mx-auto flex flex-col gap-6 p-4 w-full min-h-screen'>

                {/* Header */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 bg-dusty-grape-800/50 p-4 rounded-xl border border-dusty-grape-700 backdrop-blur-sm'>
                    <h2 className='text-2xl font-bold text-dusty-grape-100'>Statistics</h2>
                    <div className='flex items-center gap-2'>
                        <label className='text-dusty-grape-300 font-medium'>Year:</label>
                        <OrderOption
                            options={years}
                            selectedOption={selectedYear || ''}
                            suffix='Year'
                            handleOrderChange={handleYearChange}
                        />
                    </div>
                </div>

                {loading ? <StatsSkeleton /> : stats && (
                    <>
                        {/* Summary cards */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            <StatCard
                                title='Total Watched'
                                value={stats.total_watched}
                                subtitle={stats.rewatch_count > 0 ? `${stats.rewatch_count} rewatches` : `${stats.total_unique_movies} unique titles`}
                                icon={<FaFilm />}
                            />
                            <StatCard
                                title='Avg Rating'
                                value={stats.average_rating ?? '—'}
                                subtitle='out of 10'
                                icon={<FaStar />}
                            />
                            <StreakCard streak={stats.max_streak} />
                            <StatCard
                                title='Top Genre'
                                value={stats.favorite_genre ?? '—'}
                                subtitle={stats.most_active_month ? `Most active: ${stats.most_active_month}` : null}
                                icon={<FaLayerGroup />}
                            />
                        </div>

                        {/* Runtime */}
                        <RuntimeCard totalMinutes={stats.total_runtime_minutes} />

                        {/* Yearly overview — always all-time */}
                        <YearlyOverview data={stats.by_year} />

                        {/* Genre + Rating side by side */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <GenreChart data={stats.genres} />
                            <RatingDistribution data={stats.by_rating} />
                        </div>

                        {/* Monthly activity */}
                        <MonthlyActivity data={stats.by_month} />

                        {/* Language + Place side by side */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <LanguageChart data={stats.by_language} />
                            <PlaceChart data={stats.by_place} />
                        </div>

                        {/* Day of week */}
                        <DayOfWeekChart data={stats.by_day_of_week} />

                        {/* Favorite movies (most rewatched) */}
                        {stats.favorite_movie?.length > 0 && (
                            <div className='bg-dusty-grape-800/50 backdrop-blur-sm border border-dusty-grape-700 rounded-xl p-5 flex flex-col gap-3'>
                                <h3 className='text-dusty-grape-100 font-semibold'>Most Rewatched</h3>
                                <ul className='flex flex-col gap-2'>
                                    {stats.favorite_movie.map((m, i) => (
                                        <li key={i} className='flex items-center justify-between py-2 border-b border-dusty-grape-700 last:border-0'>
                                            <span className='text-dusty-grape-100 text-sm'>{m.title}</span>
                                            <span className='text-dusty-grape-400 text-sm font-medium'>{m.count}×</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Base>
    )
}
