import { useContext, useState, useCallback } from 'react'
import { getProfile } from '../services/profile'
import { getPosters, getYears } from '../services/watchedMoviesServices.js'
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

    const fetchPoster = useCallback(async () => {
        try {
            setLoading(true);
            console.log("Generating image");

            // Llamar al servicio para obtener el Blob
            const imageBlob = await getPosters({ access: sesion.access });

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
            setLoading(false)
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

    return { profile, years, loading, fetchProfile, fetchPoster, fetchYears }
}