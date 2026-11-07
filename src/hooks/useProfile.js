import { useContext, useState, useCallback } from 'react'
import { getProfile, updateProfile } from '../services/profile'
import { getPosters, getYears, getWrappedImage } from '../services/watchedMoviesServices.js'
import { SessionContext } from '../context/session.jsx'
import { downloadBlob } from '../utils/download.js'

export const useProfile = () => {
    // Custom hook to fetch user profile

    const { session } = useContext(SessionContext)

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

    const [years, setYears] = useState([])
    const [loading, setLoading] = useState(false)
    const [updatingProfile, setUpdatingProfile] = useState(false)
    const [generatingCollage, setGeneratingCollage] = useState(false)
    const [generatingWrapped, setGeneratingWrapped] = useState(false)

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true)
            const profile = await getProfile({ access: session.access })
            setProfile(profile)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    })

    const partialUpdateProfile = useCallback(async (payload) => {
        try {
            setUpdatingProfile(true)
            const profile = await updateProfile({ access: session.access, payload })
            setProfile(profile)
        } catch (e) {
            console.error(e)
        } finally {
            setUpdatingProfile(false)
        }
    }, [session.access])


    const fetchPoster = useCallback(async ({ year, order }) => {
        try {
            setGeneratingCollage(true);

            // Llamar al servicio para obtener el Blob
            const imageBlob = await getPosters({ access: session.access, year, order });

            const currentDate = new Date().toISOString().split('T')[0]
            downloadBlob(imageBlob, `collage-${currentDate}.jpeg`)
        } catch (e) {
            console.error(e)
        } finally {
            setGeneratingCollage(false)
        }
    })

    const fetchYears = useCallback(async () => {
        try {
            const newYears = await getYears({ access: session.access })
            setYears(newYears)
        } catch (e) {
            console.error(e)
        }
    })

    const fetchWrapped = useCallback(async ({ year }) => {
        try {
            setGeneratingWrapped(true)
            const image = await getWrappedImage({ access: session.access, year })
            const currentDate = new Date().toISOString().split('T')[0]
            downloadBlob(image, `wrapped-${currentDate}.png`)

        } catch (e) {
            console.error(e)
        } finally {
            setGeneratingWrapped(false)
        }
    })

    return { profile, years, loading, updatingProfile, generatingCollage, generatingWrapped, fetchProfile, partialUpdateProfile, fetchWrapped, fetchPoster, fetchYears, setProfile }
}