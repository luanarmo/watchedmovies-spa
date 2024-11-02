import { Base } from './Base'
import { SesionContext } from '../context/sesion.jsx'
import { useEffect, useContext } from 'react'
import { useProfile } from '../hooks/useProfile'
import { Loading } from '../components/Loading'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const { sesion } = useContext(SesionContext)
    const { profile, loading, fetchProfile } = useProfile()

    const navigate = useNavigate();

    useEffect(() => {
        const isExpired = () => {
            return sesion.expiresAt ? Date.now() > sesion.expiresAt : true;
        }

        if (isExpired()) {
            navigate('/login')
        }
        fetchProfile()
    }, [])

    return (

        <Base>
            {loading ? <div className='bg-gradient-to-r from-slate-700 to-slate-500 text-white'><Loading /></div> : (
                <div className='flex flex-col lg:flew-row p-4 gap-2 justify-start items-center h-screen bg-slate-950 text-white'>
                    <h1 className='text-4xl '><strong>{
                        profile.name ? profile.name : 'Profile'
                    }</strong></h1>
                    <section>
                        <h2 className='text-2xl'><strong>Email:</strong></h2>
                        <p>{profile.email}</p>

                        <h2 className='text-2xl'><strong>Bio:</strong></h2>
                        <p>{profile.profile.bio}</p>

                        <h2 className='text-2xl'><strong>Birth date:</strong></h2>
                        <p>{profile.profile.birth_date}</p>
                    </section>
                </div>
            )}
        </Base>

    )
}