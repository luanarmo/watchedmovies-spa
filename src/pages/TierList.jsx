import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SesionContext } from '../context/sesion.jsx'
import { useTierList } from '../hooks/useTierList.js'
import { useWatched } from '../hooks/useWatched.js'
import { Base } from '../components/Base.jsx'
import { Loading } from '../components/Loading.jsx'
import { OrderOption } from '../components/OrderOption.jsx'
import { TierListTable } from '../components/TierListTable.jsx'

export default function TierList() {
    const { sesion, deleteSesionExpiredSession } = useContext(SesionContext)
    const navigate = useNavigate()

    const { movies, loading, error, generatingImage, fetchTierList, moveMovie, downloadImage } = useTierList()
    const { years, fetchYears } = useWatched()

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    useEffect(() => {
        const isExpired = () => sesion.expiresAt ? Date.now() > sesion.expiresAt : true
        if (isExpired()) {
            deleteSesionExpiredSession()
            navigate('/login')
            return
        }
        fetchYears()
        fetchTierList(selectedYear)
    }, [])

    const handleYearChange = (year) => {
        const parsed = year === '' ? '' : parseInt(year, 10)
        setSelectedYear(parsed)
        fetchTierList(parsed)
    }

    const handleMoveMovie = (movieId, tier) => {
        moveMovie(movieId, tier).catch(() => toast.error('Could not move the movie, try again'))
    }

    const handleDownloadImage = () => {
        downloadImage(selectedYear)
            .catch(() => toast.error('Could not generate the image, try again'))
    }

    return (
        <Base>
            <div className='mx-auto flex flex-col gap-6 p-4 w-full min-h-screen'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 bg-dusty-grape-800/50 p-4 rounded-xl border border-dusty-grape-700 backdrop-blur-sm'>
                    <h2 className='text-2xl font-bold text-dusty-grape-100'>Tier List – {selectedYear === '' ? 'All years' : selectedYear}</h2>
                    <div className='flex items-center gap-2'>
                        <label className='text-dusty-grape-300 font-medium'>Year:</label>
                        <OrderOption
                            options={years}
                            selectedOption={selectedYear}
                            suffix='Year'
                            handleOrderChange={handleYearChange}
                        />
                        {/* Only when the list on screen is the one of the selected year */}
                        {!loading && !error && movies.length > 0 && (
                            <button
                                type='button'
                                onClick={handleDownloadImage}
                                disabled={generatingImage}
                                className='px-4 py-2 bg-dusty-grape-600 text-white rounded-lg hover:bg-dusty-grape-500 transition-colors shadow-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed'
                            >
                                {generatingImage ? 'Generating…' : 'Download image'}
                            </button>
                        )}
                    </div>
                </div>

                {error ? <p className='text-center text-dusty-grape-400'>{error}</p>
                    : loading ? <Loading />
                        : <TierListTable movies={movies} onMoveMovie={handleMoveMovie} />}
            </div>
            <ToastContainer />
        </Base>
    )
}
