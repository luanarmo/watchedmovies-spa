import { apiRequest, apiRequestBlob } from '../api/client.js'

export const getWatched = async ({ access, page, ordering, year, search }) => {
    const params = { page, ordering }
    if (year) params.watched_date_year = year
    if (search) params.search = search

    const data = await apiRequest('/api/watched-movies/', { token: access, params })

    const watchedMapped = data.results.map((movie) => ({
        id: movie.id,
        imdb_id: movie.id,
        title: movie.title,
        poster_url: movie.poster_url || 'https://placehold.co/500x750?font=roboto',
        release_date: movie.release_date || 'Unknown',
        total_views: movie.total_views,
        average_rating: movie.vote_average || 0,
    }))

    return { watchedMapped, count: data.count, next: data.next, previous: data.previous }
}

export const getPosters = async ({ access, year, order }) => {
    return apiRequestBlob('/api/watched-movies/posters/', {
        token: access,
        params: { ordering: order, watched_date_year: year }
    })
}

export const getYears = async ({ access }) => {
    const data = await apiRequest('/api/watched-movies/years/', { token: access })
    return data.years
}

export const getWrappedImage = async ({ access, year }) => {
    return apiRequestBlob('/api/watched-movies/wrapped/', {
        token: access,
        params: { watched_date_year: year }
    })
}

export const addWatched = async ({ movie, payload, access }) => {
    return apiRequest('/api/view-details/', {
        method: 'POST',
        token: access,
        body: { watched_movie: movie, ...payload }
    })
}

export const removeWatched = async ({ movieId, access }) => {
    return apiRequest(`/api/watched-movies/${movieId}/`, {
        method: 'DELETE',
        token: access
    })
}

export const getWatchedDetails = async ({ movieId, access }) => {
    return apiRequest(`/api/watched-movies/${movieId}/`, { token: access })
}
