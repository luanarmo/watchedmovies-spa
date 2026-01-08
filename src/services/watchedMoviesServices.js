const BASE_API_URL = import.meta.env.VITE_BASE_API_URL


export const getWatched = async ({ access, page, ordering, year }) => {
    // Fetch watched movies from the API

    try {
        const response = await fetch(`${BASE_API_URL}/api/watched-movies/?page=${page}&ordering=${ordering}&watched_date_year=${year}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        const data = await response.json()

        if (!response.ok) {
            return []
        }

        const watchedMapped = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url ? movie.poster_url : 'https://placehold.co/500x750?font=roboto',
            release_date: movie.release_date ? movie.release_date : 'Unknown',
            total_views: movie.total_views,
            average_rating: movie.vote_average ? movie.vote_average : 0,
        }))

        return { watchedMapped, count: data.count, next: data.next, previous: data.previous }

    }
    catch (e) {
        throw new Error(`Error fetching watched movies ${e}`)
    }

}

export const getPosters = async ({ access, year, order }) => {
    // Fetch watched movies from the API

    try {
        const response = await fetch(`${BASE_API_URL}/api/watched-movies/posters/?ordering=${order}&watched_date_year=${year}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        if (!response.ok) {
            throw new Error('Error fetching the image');
        }

        // Retornar el Blob directamente
        return await response.blob();

    }
    catch (e) {
        throw new Error(`Error fetching watched movies ${e}`)
    }

}

export const getYears = async ({ access }) => {
    // Fetch watched movies from the API

    try {
        const response = await fetch(`${BASE_API_URL}/api/watched-movies/years/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        if (!response.ok) {
            throw new Error('Error fetching the years');
        }

        const data = await response.json()

        return data.years

    }
    catch (e) {
        throw new Error(`Error fetching watched movies ${e}`)
    }

}

export const getWrappedImage = async ({ access, year }) => {
    // Fetch watched movies from the API

    try {
        const response = await fetch(`${BASE_API_URL}/api/watched-movies/wrapped/?watched_date_year=${year}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        if (!response.ok) {
            throw new Error('Error fetching the image');
        }

        // Retornar el Blob directamente
        return await response.blob();

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

        if (!response.ok) {
            return {}
        }

        const watched = await response.json()

        return watched

    } catch (e) {
        throw new Error(`Error fetching watched list ${e}`)
    }

}