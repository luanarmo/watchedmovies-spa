import { apiRequest } from '../api/client.js'

export const popularMovies = async () => {
    const movies = await apiRequest('/api/tmdb/popular_movies/')
    return movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_url: movie.poster_url || 'https://placehold.co/500x750?font=roboto',
    }))
}
