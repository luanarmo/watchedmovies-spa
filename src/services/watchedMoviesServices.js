const BASE_API_URL = import.meta.env.VITE_BASE_API_URL


export const getWatched = async ({ access }) => {
    // Fetch watched movies from the API

    try {
        const response = await fetch(`${BASE_API_URL}/api/watched-movies/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        const watched = await response.json()

        return watched.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url ? movie.poster_url : 'https://placehold.co/500x750?font=roboto',
            release_date: movie.release_date ? movie.release_date : 'Unknown',
            overview: movie.overview ? movie.overview : 'No overview available',
        }))
    }
    catch (e) {
        throw new Error(`Error fetching watched movies ${e}`)
    }

}

export const addWatched = async ({ movie, payload, access }) => {
    // remove poster_url and backdrop_url from the movie object

    const pload = {
        watched_movie: movie,
        ...payload
    }


    try {
        const response = await fetch(`${BASE_API_URL}/api/view-details/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(pload)
        })
        const watched = await response.json()

        return watched

    } catch (e) {
        throw new Error(`Error fetching watched list ${e}`)
    }

}

export const removeWatched = async ({ movieId, access }) => {

    try {
        await fetch(`${BASE_API_URL}/api/watched-movies/${movieId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

    } catch (e) {
        throw new Error(`Error fetching watched list ${e}`)
    }

}

export const getWatchedDetails = async ({ movieId, access }) => {

    try {
        const response = await fetch(`${BASE_API_URL}/api/watched-movies/${movieId}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        const watched = await response.json()

        return watched

    } catch (e) {
        throw new Error(`Error fetching watched list ${e}`)
    }

}