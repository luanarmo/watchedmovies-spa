import { apiRequest } from '../api/client.js'

export const movieDetails = async ({ movieId, token }) => {
    const movie = await apiRequest(`/api/tmdb/movie-details/${movieId}/`, { token })
    return {
        id: movie.id,
        adult: movie.adult,
        backdrop_path: movie.backdrop_path,
        genre_ids: movie.genre_ids,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        title: movie.title,
        video: movie.video,
        vote_count: movie.vote_count,
        poster_url: movie.poster_url || 'https://placehold.co/500x750?font=roboto',
        backdrop_url: movie.backdrop_url || 'https://placehold.co/480x270?font=roboto',
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        is_watched: movie.is_watched ?? false,
        is_plan_to_watch: movie.is_plan_to_watch ?? false,
    }
}
