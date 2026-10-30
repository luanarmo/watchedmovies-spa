import { useState, useCallback, useContext, useRef } from 'react'
import { SesionContext } from '../context/sesion'
import { getTierList, getTierListImage, setMovieTier } from '../services/watchedMoviesServices'
import { base64ToBlob, downloadBlob } from '../utils/download'
import { toYearParam } from '../utils/years'

export const useTierList = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [generatingImage, setGeneratingImage] = useState(false)

    const { sesion } = useContext(SesionContext)
    const lastRequest = useRef(0)
    const savingMovies = useRef(new Set())

    const fetchTierList = useCallback(async (year) => {
        // Only the last request counts: an earlier one that answers later must not overwrite the list
        const request = ++lastRequest.current
        try {
            setLoading(true)
            setError(null)
            const data = await getTierList({ access: sesion.access, year: toYearParam(year) })
            if (request === lastRequest.current) setMovies(data)
        } catch (e) {
            if (request === lastRequest.current) setError('Error fetching tier list')
            console.error(e)
        } finally {
            if (request === lastRequest.current) setLoading(false)
        }
    }, [sesion.access])

    const changeTier = (movieId, tier) => {
        setMovies(current => current.map(movie => movie.id === movieId ? { ...movie, tier } : movie))
    }

    // Moves the poster right away and puts it back in its tier if the API rejects the change.
    // A poster that is still being saved can't be moved again, so two saves never overlap
    const moveMovie = useCallback(async (movieId, tier) => {
        if (savingMovies.current.has(movieId)) return
        savingMovies.current.add(movieId)
        const previousTier = movies.find(movie => movie.id === movieId)?.tier
        changeTier(movieId, tier)
        try {
            await setMovieTier({ access: sesion.access, movieId, tier })
        } catch (e) {
            changeTier(movieId, previousTier)
            throw e
        } finally {
            savingMovies.current.delete(movieId)
        }
    }, [movies, sesion.access])

    // The API sends the image in base64: it is turned into a Blob because big data URLs can fail to download
    const downloadImage = useCallback(async (year) => {
        const yearParam = toYearParam(year)
        try {
            setGeneratingImage(true)
            const { image } = await getTierListImage({ access: sesion.access, year: yearParam })
            if (!image) throw new Error('The API did not send the image')
            downloadBlob(base64ToBlob(image, 'image/png'), `tier-list-${yearParam}.png`)
        } finally {
            setGeneratingImage(false)
        }
    }, [sesion.access])

    return { movies, loading, error, generatingImage, fetchTierList, moveMovie, downloadImage }
}
