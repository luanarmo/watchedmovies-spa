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
        is_favorite: movie.is_favorite,
        first_watched_date: movie.first_watched_date,
        tier: movie.tier,
    }))

    return { watchedMapped, count: data.count, next: data.next, previous: data.previous }
}

export const getPosters = async ({ access, year, order }) => {
    return apiRequestBlob('/api/watched-movies/posters/', {
        token: access,
        params: { ordering: order, watched_date_year: year }
    })
}

// Every page asks for the years on mount, so the request is shared: the promise is cached
// (which also merges simultaneous calls) until a mutation changes them or the TTL runs out.
const YEARS_TTL_MS = 5 * 60 * 1000
let yearsCache = null

export const invalidateYears = () => {
    yearsCache = null
}

export const getYears = async ({ access }) => {
    if (!yearsCache || yearsCache.access !== access || yearsCache.expires < Date.now()) {
        const promise = apiRequest('/api/watched-movies/years/', { token: access }).then((data) => data.years)
        const entry = { access, expires: Date.now() + YEARS_TTL_MS, promise }
        yearsCache = entry
        // a failed request must not stay cached
        promise.catch(() => {
            if (yearsCache === entry) yearsCache = null
        })
    }
    const { promise } = yearsCache
    // callers mutate the list (useWatched adds the current year), so each one gets its own copy
    return [...(await promise)]
}

export const getTierList = async ({ access, year }) => {
    return apiRequest('/api/watched-movies/tier-list/', { token: access, params: { year } })
}

export const getTierListImage = async ({ access, year }) => {
    return apiRequest('/api/watched-movies/tier-list-image/', { token: access, params: { year } })
}

export const setMovieTier = async ({ access, movieId, tier }) => {
    return apiRequest(`/api/watched-movies/${movieId}/tier/`, { method: 'PATCH', token: access, body: { tier } })
}

export const getWrappedImage =async ({ access, year }) => {
    return apiRequestBlob('/api/watched-movies/wrapped/', {
        token: access,
        params: { watched_date_year: year }
    })
}

export const addWatched = async ({ movie, payload, access }) => {
    const data = await apiRequest('/api/view-details/', {
        method: 'POST',
        token: access,
        body: { watched_movie: movie, ...payload }
    })
    invalidateYears()
    return data
}

export const removeWatched = async ({ movieId, access }) => {
    const data = await apiRequest(`/api/watched-movies/${movieId}/`, {
        method: 'DELETE',
        token: access
    })
    invalidateYears()
    return data
}

export const getWatchedDetails = async ({ movieId, access }) => {
    return apiRequest(`/api/watched-movies/${movieId}/`, { token: access })
}
