import { Base } from './Base'
import { useEffect } from 'react'
import { useProfile } from '../hooks/useProfile'
import { Loading } from '../components/Loading'

export default function Profile() {

    const { profile, loading, fetchProfile } = useProfile()

    useEffect(() => {
        fetchProfile()
    }, [])

    return (

        <Base>
            {loading ? <div className='bg-gradient-to-r from-slate-700 to-slate-500 text-white'><Loading /></div> : (
                <div className='flex flex-col lg:flew-row p-4 gap-2 justify-start items-center h-screen bg-slate-950 text-white'>
                    <h1 className='text-4xl '><strong>{
                        profile.name ? profile.name : 'Perfil'
                    }</strong></h1>
                    <section>
                        <h2 className='text-2xl'><strong>Correo:</strong></h2>
                        <p>{profile.email}</p>

                        <h2 className='text-2xl'><strong>Biografia:</strong></h2>
                        <p>{profile.profile.bio}</p>

                        <h2 className='text-2xl'><strong>Fecha de nacimiento:</strong></h2>
                        <p>{profile.profile.birth_date}</p>
                    </section>
                </div>
            )}
        </Base>

    )
}