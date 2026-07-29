import { apiRequest } from '../api/client.js'

export const getAllPlanMovies = async ({ access, page }) => {
    const data = await apiRequest('/api/plan-to-watch/', {
        token: access,
        params: { page }
    })

    if (data.results.length === 0) {
        return { planMovies: [], count: 0, next: null, previous: null }
    }

    const planMovies = data.results.map((movie) => ({
        id: movie.id,
        imdb_id: movie.movie.id,
        title: movie.movie.title,
        overview: movie.movie.overview,
        poster_url: movie.movie.poster_url || 'https://placehold.co/500x750?font=roboto',
        release_date: movie.movie.release_date || 'Unknown',
        vote_average: movie.movie.vote_average,
        vote_count: movie.movie.vote_count,
        genres: movie.movie.genres,
        runtime: movie.movie.runtime,
        tagline: movie.movie.tagline
    }))

    return { planMovies, count: data.count, next: data.next, previous: data.previous }
}

export const addPlanMovie = async ({ movie, access }) => {
    return apiRequest('/api/plan-to-watch/', {
        method: 'POST',
        token: access,
        body: { movie }
    })
}

export const removePlanMovie = async ({ movieId, access }) => {
    return apiRequest(`/api/plan-to-watch/${movieId}/`, {
        method: 'DELETE',
        token: access
    })
}
