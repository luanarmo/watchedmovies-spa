import { useContext, useState, useCallback } from 'react'
import { getProfile, updateProfile } from '../services/profile'
import { getPosters, getYears, getWrappedImage } from '../services/watchedMoviesServices.js'
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

    const [years, setYears] = useState([])
    const [loading, setLoading] = useState(false)
    const [updatingProfile, setUpdatingProfile] = useState(false)
    const [generatingCollage, setGeneratingCollage] = useState(false)
    const [generatingWrapped, setGeneratingWrapped] = useState(false)

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

    const partialUpdateProfile = useCallback(async (payload) => {
        try {
            setUpdatingProfile(true)
            const profile = await updateProfile({ access: sesion.access, payload })
            setProfile(profile)
        } catch (e) {
            console.error(e)
        } finally {
            setUpdatingProfile(false)
        }
    }, [sesion.access])


    const fetchPoster = useCallback(async ({ year, order }) => {
        try {
            setGeneratingCollage(true);
            console.log("Generating image");

            // Llamar al servicio para obtener el Blob
            const imageBlob = await getPosters({ access: sesion.access, year, order });

            // Crear un objeto URL para el Blob
            const url = URL.createObjectURL(imageBlob);

            // Crear un enlace temporal para descargar la imagen
            const a = document.createElement('a');
            a.href = url;
            a.download = 'collage.jpeg'; // Nombre del archivo
            a.click();

            // Liberar la memoria del objeto URL
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error(e)
        } finally {
            setGeneratingCollage(false)
        }
    })

    const fetchYears = useCallback(async () => {
        try {
            const newYears = await getYears({ access: sesion.access })
            setYears(newYears)
        } catch (e) {
            console.error(e)
        }
    })

    const fetchWrapped = useCallback(async () => {
        try {
            setGeneratingWrapped(true)
            const image = await getWrappedImage({ access: sesion.access })
            const url = URL.createObjectURL(image);
            const a = document.createElement('a');

            a.href = url;
            a.download = 'wrapped.png';
            a.click();
            URL.revokeObjectURL(url);

        } catch (e) {
            console.error(e)
        } finally {
            setGeneratingWrapped(false)
        }
    })

    return { profile, years, loading, updatingProfile, generatingCollage, generatingWrapped, fetchProfile, partialUpdateProfile, fetchWrapped, fetchPoster, fetchYears, setProfile }
}