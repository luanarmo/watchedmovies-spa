import { useContext, useState, useCallback } from 'react'
import { getProfile } from '../services/profile'
import { SesionContext } from '../context/sesion.jsx'

export const useProfile = () => {
    // Custom hook to fetch user profile

    const { sesion } = useContext(SesionContext)

    const [profile, setProfile] = useState({
        email: '',
        name: '',
        pk: '',
        profile: {
            bio: '',
            birth_date: '',
            pk: '',
        }
    })
    const [loading, setLoading] = useState(false)


    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true)
            const profile = await getProfile({ access: sesion.access })
            setProfile(profile)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    })

    return { profile, loading, fetchProfile }
}