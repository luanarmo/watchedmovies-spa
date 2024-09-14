const BASE_API_URL = import.meta.env.VITE_BASE_API_URL


export const movieDetails = async ({ movieId }) => {
    // Fetch movie details from the API
    try {
        const response = await fetch(`${BASE_API_URL}/api/tmdb/movie-details/${movieId}/`)
        const movie = await response.json()
        return {
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url ? movie.poster_url : 'https://placehold.co/500x750?font=roboto',
            backdrop_url: movie.backdrop_url ? movie.backdrop_url : 'https://placehold.co/1920x1080?font=roboto',
            overview: movie.overview,
            release_date: movie.release_date,
            genres: movie.genres,
            vote_average: movie.vote_average,
        }

    } catch (e) {
        throw new Error(`Error fetching movie details ${e}`)
    }

}
