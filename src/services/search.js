import { apiRequest } from '../api/client.js'

export const searchMovies = async ({ query, page = 1 }) => {
    if (query === '') return null

    const data = await apiRequest(`/api/tmdb/search-movies/${query}/`, { params: { page } })

    return {
        movies: data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url || 'https://placehold.co/500x750?font=roboto',
        })),
        totalPages: data.total_pages,
        totalResults: data.total_results,
    }
}
