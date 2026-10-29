import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SesionContext } from '../context/sesion.jsx'
import { useTierList } from '../hooks/useTierList.js'
import { Base } from '../components/Base.jsx'
import { Loading } from '../components/Loading.jsx'
import { TierListTable } from '../components/TierListTable.jsx'

export default function TierList() {
    const { sesion, deleteSesionExpiredSession } = useContext(SesionContext)
    const navigate = useNavigate()

    const { movies, loading, error, fetchTierList } = useTierList()

    useEffect(() => {
        const isExpired = () => sesion.expiresAt ? Date.now() > sesion.expiresAt : true
        if (isExpired()) {
            deleteSesionExpiredSession()
            navigate('/login')
            return
        }
        fetchTierList()
    }, [])

    return (
        <Base>
            <div className='mx-auto flex flex-col gap-6 p-4 w-full min-h-screen'>
                <div className='flex items-center justify-between gap-4 bg-dusty-grape-800/50 p-4 rounded-xl border border-dusty-grape-700 backdrop-blur-sm'>
                    <h2 className='text-2xl font-bold text-dusty-grape-100'>Tier List {new Date().getFullYear()}</h2>
                </div>

                {error ? <p className='text-center text-dusty-grape-400'>{error}</p>
                    : loading ? <Loading />
                        : <TierListTable movies={movies} />}
            </div>
        </Base>
    )
}
